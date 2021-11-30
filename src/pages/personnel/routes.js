import { CompanySection, ContractSection, PersonalSection } from './add'

const routes = [
  {
    name: 'personal',
    component: PersonalSection,
  },
  {
    name: 'contract',
    component: ContractSection,
  },
  {
    name: 'company',
    component: CompanySection,
  },
]

export default routes
