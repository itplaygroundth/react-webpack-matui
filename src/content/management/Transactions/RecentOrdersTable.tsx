import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from '@src/components/Label';
import { Transactions, TransactionsStatus } from '@src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import React from 'react';

interface RecentOrdersTableProps {
  className?: string;
  //cryptoOrders: Transactions[];
  transaction: Transactions[];
}

interface Filters {
  status?: TransactionsStatus;
}

const formatNumber = (numberString:string)=> {
  
  if (numberString.length !== 10) {
    return "Invalid input. Please provide a 10-digit number.";
  }

  return `${'xxx'}-${'x'}-${numberString.slice(4, 8)}-${'xx'}`;

}

const getStatusLabel = (transactiontatus: TransactionsStatus): JSX.Element => {
  const map = {
    void: {
      text: 'Void',
      color: 'error'
    },
    verified: {
      text: 'Verified',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[transactiontatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  transaction: Transactions[],
  filters: Filters
): Transactions[] => {
  return transaction.filter((transaction) => {
    let matches = true;

    if (filters.status && transaction.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  transaction: Transactions[],
  page: number,
  limit: number
): Transactions[] => {
  return transaction.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ transaction }) => {

  console.log(transaction)
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(100);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'verified',
      name: 'Verified'
    },
    {
      id: 'void',
      name: 'Void'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value:any = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? transaction.map((transaction:Transactions) => transaction.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: number
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(transaction, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < transaction.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === transaction.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Transactions"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Accout Number</TableCell>
              <TableCell>Accout Name</TableCell>
              <TableCell align="left">BankName</TableCell>
              <TableCell align="right">Before</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((transaction) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                transaction.id
              );
              return (
                <TableRow
                  hover
                  key={transaction.id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, transaction.id)
                      }
                      value={isCryptoOrderSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {transaction.id}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {format(cryptoOrder.orderDate, 'MMMM dd yyyy')}
                      
                    </Typography> */}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {/* {transaction.transaction_date} */}
                      { format(new Date(transaction.transaction_date), 'dd-MM-yyyy HH:mm:ss')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary"    fontWeight="bold" noWrap>
                      {/* {format(transaction.creationdate, 'MMMM dd yyyy')} */}
                      {transaction.uid.indexOf('D')!=-1?'โอนเงิน':'รับโอนเงิน'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      { formatNumber(transaction.User.banknumber)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {transaction.User.fullname}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {transaction.bankname}
                    </Typography>
                  </TableCell>
                 
                  <TableCell align="right">
                    {/* <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                    
                    
                    </Typography> */}
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(transaction.beforebalance).format(
                        `${"฿"}0,0.00`
                      )}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder.sourceDesc}
                    </Typography> */}
                  </TableCell>
                  <TableCell align="right">
                    {/* <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.amountCrypto}
                      {cryptoOrder.cryptoCurrency}
                    </Typography> */}
                    <Typography variant="body2" color="text.secondary"    fontWeight="bold" noWrap>
                      {numeral(transaction.transactionamount).format(
                        `${"฿"}0,0.00`
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {/* <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.amountCrypto}
                      {cryptoOrder.cryptoCurrency}
                    </Typography> */}
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(transaction.balance).format(
                        `${"฿"}0,0.00`
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(transaction.status=='void'?'void':'verified')}
                  
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Member" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Delete Partner" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip> */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30, 50, 100]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  transaction: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  transaction: []
};

export default RecentOrdersTable;
