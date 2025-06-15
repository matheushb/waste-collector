import React, { useEffect, useState, ChangeEvent } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Box,
} from '@mui/material';
import api from '../services/api';

interface Collection {
  id: string;
  wasteTypeId: string;
  weight: number;
  points: number;
  created_at: string;
}

interface CollectionsResponse {
  data: Collection[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    next: boolean;
    prev: boolean;
  };
}

const History = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const response = await api.get('/collections', {
          params: {
            page: page + 1,
            limit: 10,
          },
        });
        setCollections(response.data.data);
        setTotalItems(response.data.meta.total);
      } catch (error: any) {
        setError(
          error.response?.data?.message || 'Erro ao carregar histórico.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Typography component="h1" variant="h5" gutterBottom>
          Histórico de Coletas
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Tipo de Resíduo</TableCell>
                <TableCell align="right">Peso (kg)</TableCell>
                <TableCell align="right">Pontos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collections.map((collection) => (
                <TableRow key={collection.id}>
                  <TableCell>
                    {new Date(collection.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                  <TableCell>ID: {collection.wasteTypeId}</TableCell>
                  <TableCell align="right">{collection.weight}</TableCell>
                  <TableCell align="right">{collection.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Itens por página"
        />
      </Paper>
    </Container>
  );
};

export default History; 