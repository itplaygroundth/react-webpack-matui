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
import { Commission, MembersStatus, TransactionsStatus,Promotion, PromotionStatus } from '@src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import BulkActions from './BulkActions';
import React from 'react';

interface RecentOrdersTableProps {
  className?: string;
  //cryptoOrders: Commission[];
  promotions: Promotion[];
}

interface Filters {
  status?: PromotionStatus;
}

const getStatusLabel = (memberStatus:PromotionStatus): JSX.Element => {
  const map = {
    'failed': {
      text: 'Failed',
      color: 'error'
    },
    'active': {
      text: 'Active',
      color: 'success'
    },
    'pending': {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[memberStatus==0?'pending':'active'];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  promotions: Promotion[],
  filters: Filters
): Promotion[] => {
  return promotions.filter((promotions) => {
    let matches = true;

    if (filters.status && promotions.Active !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  promotions: Promotion[],
  page: number,
  limit: number
): Promotion[] => {
  return promotions.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ promotions }) => {

  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'active',
      name: 'Active'
    },
    {
      id: 'pending',
      name: 'Pending'
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
        ? promotions.map((promotion:Promotion) => promotion.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
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

  const filteredCryptoOrders = applyFilters(promotions, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < promotions.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === promotions.length;
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
          title="Recent Promotion"
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
              
              <TableCell>Promotion ID</TableCell>
              <TableCell>Commission affiliate</TableCell>
              <TableCell>Commission name</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="right">Turnover</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((members) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                members.id
              );
              return (
                <TableRow
                  hover
                  key={members.id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, members.id)
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
                      {members.id}
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
                      {}
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
                      {/* {cryptoOrder.orderID} */}
                      {members.ProName}
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
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(members.balance).format(
                        `${"฿"}0,0.00`
                      )}
                    </Typography> */}
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
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(members.turnover).format(
                        `${"฿"}0,0.00`
                      )}
                    </Typography> */}
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(members.Active==0?0:1)}
                  
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
                    <Tooltip title="Delete Partner" arrow>
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
                    </Tooltip>
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
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  promotions: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  promotions: []
};

export default RecentOrdersTable;
