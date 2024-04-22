export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create Ticket',
    route: '/events/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
]

export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  startDateTime: new Date(),
  ticketUrl:'',
  price: '',
  quantity: '',
  url: '',
}
