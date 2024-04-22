export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Sell Tickets',
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
}
