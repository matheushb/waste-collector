import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Delete as DeleteIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';
import api from '../services/api';

interface Collection {
  id: string;
  userId: string;
  wasteTypeId: string;
  weight: number;
  points: number;
  created_at: string;
  updated_at: string;
}

interface DashboardSummary {
  totalWeight: number;
  totalPoints: number;
  collectionsCount: number;
  collections: Collection[];
}

interface CollectionsResponse {
  data: Collection[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

const Dashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary>({
    totalWeight: 0,
    totalPoints: 0,
    collectionsCount: 0,
    collections: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [summaryResponse, collectionsResponse] = await Promise.all([
        api.get<Omit<DashboardSummary, 'collections'>>('/collections/dashboard/summary'),
        api.get<CollectionsResponse>('/collections')
      ]);

      console.log('Summary Response:', summaryResponse.data);
      console.log('Collections Response:', collectionsResponse.data);

      const collections = Array.isArray(collectionsResponse.data.data) 
        ? collectionsResponse.data.data 
        : [];

      console.log('Processed Collections:', collections);

      setSummary({
        ...summaryResponse.data,
        collections,
      });

      console.log('Final Summary State:', {
        ...summaryResponse.data,
        collections,
      });
    } catch (error: any) {
      console.error('Dashboard Error:', error);
      setError(
        error.response?.data?.message || 'Erro ao carregar dados do dashboard.',
      );
      setSummary(prev => ({ ...prev, collections: [] }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
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

  const averagePoints = summary.collectionsCount > 0
    ? summary.totalPoints / summary.collectionsCount
    : 0;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Cards de Estatísticas */}
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', bgcolor: 'primary.light', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmojiEventsIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Total de Pontos</Typography>
              </Box>
              <Typography variant="h4" component="div">
                {summary.totalPoints}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Pontos acumulados
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', bgcolor: 'secondary.light', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DeleteIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Total de Coletas</Typography>
              </Box>
              <Typography variant="h4" component="div">
                {summary.collectionsCount}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Coletas realizadas
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', bgcolor: 'success.light', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Peso Total</Typography>
              </Box>
              <Typography variant="h4" component="div">
                {summary.totalWeight}kg
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Material reciclado
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', bgcolor: 'info.light', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Média por Coleta</Typography>
              </Box>
              <Typography variant="h4" component="div">
                {averagePoints.toFixed(1)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Pontos por coleta
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Lista de Coletas Recentes */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Coletas Recentes
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {!Array.isArray(summary.collections) || summary.collections.length === 0 ? (
                <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                  Nenhuma coleta registrada ainda.
                </Typography>
              ) : (
                <Grid container spacing={2}>
                  {[...summary.collections]
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .slice(0, 5)
                    .map((collection) => (
                      <Grid item xs={12} key={collection.id}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            backgroundColor: 'grey.50',
                            '&:hover': {
                              backgroundColor: 'grey.100',
                            },
                          }}
                        >
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={3}>
                              <Typography variant="body2" color="text.secondary">
                                Tipo de Lixo
                              </Typography>
                              <Typography variant="body1">
                                ID: {collection.wasteTypeId}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                              <Typography variant="body2" color="text.secondary">
                                Peso
                              </Typography>
                              <Typography variant="body1">
                                {collection.weight}kg
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                              <Typography variant="body2" color="text.secondary">
                                Pontos
                              </Typography>
                              <Typography variant="body1">
                                {collection.points}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                              <Typography variant="body2" color="text.secondary">
                                Data
                              </Typography>
                              <Typography variant="body1">
                                {new Date(collection.created_at).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    ))}
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 