import { Container } from '@/components/container';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Arttoys = [
  {
    Arttoy: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    Arttoy: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    Arttoy: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    Arttoy: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    Arttoy: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    Arttoy: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    Arttoy: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];

export default function AdminArttoyManagementPage() {
  return (
    <Container>
      <h1 className='text-2xl text-center mb-4 font-semibold'>
        Art-toy Management
      </h1>
      <Table>
        <TableCaption>A list of your recent Arttoys.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Arttoy</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Arttoys.map((Arttoy) => (
            <TableRow key={Arttoy.Arttoy}>
              <TableCell className='font-medium'>{Arttoy.Arttoy}</TableCell>
              <TableCell>{Arttoy.paymentStatus}</TableCell>
              <TableCell>{Arttoy.paymentMethod}</TableCell>
              <TableCell className='text-right'>{Arttoy.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className='text-right'>$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Container>
  );
}
