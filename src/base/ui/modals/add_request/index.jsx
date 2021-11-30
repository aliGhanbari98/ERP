/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Glyph, Headline } from '@liquid-design/liquid-design-react'
import { Button, DatePicker, Dropdown, TextField } from 'base/form'
import { Modal, FileProgressBar } from 'base/ui'
import inputOptions from 'helpers/InputsOptions'
import PermissionHandler from 'helpers/permissionHandler'
import { useToggle } from 'helpers/hooks'
import modalsHandler from 'helpers/modalsHandler'
import { secondsToTime } from 'helpers/datetime'
import { createRequestReq } from 'queries/requests'
import { usersReq } from 'queries/users'
import { profileReq } from 'queries/profile'
import { uploadReq, deleteFileReq } from 'queries/fileUpload'
import { authStore } from 'stores'
import styles from './index.module.scss'

const defaultFields = {
  from_datetime: '',
  to_datetime: '',
  description: '',
  request_type: '',
  user_id: '',
}

const AddRequestModal = observer(({ open, onClose, defaultTrigger = true }) => {
  const { userData } = authStore
  const [fields, setFields] = useState(defaultFields)
  const [requestType, setRequestType] = useState()
  const [duration, setDuration] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [remainedTimes, setRemainedTimes] = useState({})
  const [attachments, setAttachments] = useState([])
  const [members, setMembers] = useState({ disabled: false, options: [] })
  const { value: isLoading, toggle: toggleLoading } = useToggle(false)
  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleConfirm = () => {
    toggleLoading()
    createRequestReq({
      ...fields,
      attachments: attachments.map((item) => ({
        file_name: item.file_name,
        file_url: item.file_url,
      })),
    })
      .then(() => {
        toggleLoading()
        setIsOpen(false)
        modalsHandler({
          message: `Your request for ${requestType} has been saved successfully.`,
          isOpen: true,
        })
      })
      .catch(() => {})
  }

  const handleChange = (key, value) =>
    setFields((prevState) => ({ ...prevState, [key]: value }))

  const attachmentChangeHandler = (targetId, value, key) =>
    setAttachments((prevState) =>
      prevState.map((item) =>
        targetId !== item.id ? item : { ...item, [key]: value }
      )
    )

  const onFileUpload = (file) => {
    const id = Date.now()
    uploadReq({
      file,
      setProgressValue: (lastValue) =>
        attachmentChangeHandler(id, lastValue, 'progressValue'),
    }).then((data) => {
      attachmentChangeHandler(id, data.file_name, 'file_name')
      attachmentChangeHandler(id, data.file_url, 'file_url')
    })
    setAttachments((prevState) => [
      ...prevState,
      {
        id,
        fileName: file.name,
        progressValue: 0,
      },
    ])
  }

  const onCancelUpload = (targetId) => {
    deleteFileReq(
      attachments.find(({ id }) => targetId === id).file_name
    ).then(() =>
      setAttachments((prevState) =>
        prevState.filter(({ id }) => targetId !== id)
      )
    )
  }

  const onConfirmUpload = (targetId) =>
    setAttachments((prevState) => prevState.filter(({ id }) => targetId !== id))

  useEffect(() => {
    if (userData.role === 'employee' || userData.role === 'manager') {
      setMembers({
        disabled: true,
        options: [
          {
            name: `${userData.first_name} ${userData.last_name}`,
            value: userData.id,
          },
        ],
      })
      setFields((prevState) => ({ ...prevState, user_id: userData.id }))
    } else {
      usersReq()
        .then((data) =>
          setMembers({
            disabled: false,
            options: data.result.map((member) => ({
              ...member,
              name: `${member.first_name} ${member.last_name}`,
            })),
          })
        )
        .catch(() => {})
    }
    profileReq().then(
      ({
        remained_times: {
          remained_overtime,
          remained_sick_leave,
          remained_eligible_leave,
        },
      }) =>
        setRemainedTimes({
          Overtime: secondsToTime(remained_overtime, 'seperate') || '0',
          'Sick Leave': secondsToTime(remained_sick_leave, 'seperate') || '0',
          'Hourly Leave':
            secondsToTime(remained_eligible_leave, 'seperate') || '0',
          'Manual Leave':
            secondsToTime(remained_eligible_leave, 'seperate') || '0',
        })
    )
  }, [])

  const selectedRequestRemainingTime = remainedTimes[requestType]

  useEffect(() => {
    if (open) setIsOpen(open)
  }, [open])

  return (
    <div className={styles.addRequest}>
      {defaultTrigger && (
        <Button color="secondary" onClick={handleOpen}>
          Add Request
        </Button>
      )}

      <Modal
        overlayClassName={styles.modalOverlay}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          if (onClose instanceof Function) onClose()
        }}
        label="Add Request"
      >
        <div className={styles.card}>
          <div className={styles.header}>
            <div>
              <Headline type="H2">00:00</Headline>
              <Headline type="H4">{requestType || 'Request type'}</Headline>
            </div>
            <PermissionHandler view={['admin']}>
              <div>
                <span>
                  {selectedRequestRemainingTime && `Remaining ${requestType}: `}
                </span>
                <span>{selectedRequestRemainingTime}</span>
              </div>
            </PermissionHandler>
          </div>
          <PermissionHandler view={['admin']}>
            {requestType && (
              <div className={styles.info}>
                <Glyph name="tooltipFilled" size="24" />
                <span>
                  {`You can change the duration to the time you want to confirm as
                  ${requestType}.`}
                </span>
              </div>
            )}
          </PermissionHandler>

          <div className={styles.inputs}>
            <div className={styles.row}>
              <Dropdown
                placeholder="Request type"
                options={inputOptions.dropdown.requestType}
                onClick={(item) => {
                  handleChange('request_type', item.value)
                  setRequestType(item.name)
                }}
              />
              <PermissionHandler view={['admin']}>
                <Dropdown
                  placeholder="Personnel"
                  options={members.options}
                  onClick={(item) => handleChange('user_id', item.id)}
                  defaultItem={{
                    value: members.disabled ? userData.id : null,
                    key: 'value',
                  }}
                  disabled={members.disabled}
                />
              </PermissionHandler>

              <div className={styles.duration}>
                <TextField
                  label="Duration"
                  placeholder="hh:mm"
                  value={duration}
                  onChange={setDuration}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.datepicker}>
                <DatePicker
                  startDateLabel="From"
                  startDateChange={(date) =>
                    handleChange('from_datetime', date.toISOString())
                  }
                  withCalendar
                />
              </div>

              <div className={styles.datepicker}>
                <DatePicker
                  startDateLabel="To"
                  startDateChange={(date) =>
                    handleChange('to_datetime', date.toISOString())
                  }
                  withCalendar
                />
              </div>
            </div>

            <TextField
              label="Description"
              placeholder="Write your description here"
              value={fields.description}
              onChange={(value) => handleChange('description', value)}
              multiline
              onUpload={onFileUpload}
            />

            <div className={styles.uploadDescription}>
              <div>
                <Glyph name="tooltipFilled" size={15} />
              </div>
              <div>
                <span>The maximum file size is: 80 MB</span>
                <span>Allowed formats are: JPG, PNG, PDF</span>
              </div>
            </div>

            <div className={styles.progressBars}>
              {attachments.map((item) => (
                <FileProgressBar
                  {...{
                    ...item,
                    onClose: onCancelUpload,
                    onConfirm: onConfirmUpload,
                  }}
                />
              ))}
            </div>
          </div>

          <div className={styles.footer}>
            <Button
              color="secondary"
              appearance="secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>

            <Button
              color="secondary"
              onClick={handleConfirm}
              loading={isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
})

export default AddRequestModal
