import { useState, useEffect, FormEvent } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import api from '../services/api';

interface WasteType {
  id: string;
  name: string;
  points: number;
}

interface WasteTypesResponse {
  data: WasteType[];
  total: number;
  page: number;
  limit: number;
}

interface CreateCollectionResponse {
  id: string;
  wasteTypeId: string;
  userId: string;
  weight: number;
  points: number;
  createdAt: string;
  updatedAt: string;
}

function WasteCollection() {
  const [wasteTypes, setWasteTypes] = useState<WasteType[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    const fetchWasteTypes = async () => {
      try {
        setLoading(true);
        const response = await api.get<WasteTypesResponse>('/waste-types');
        setWasteTypes(response.data.data);
      } catch (error: any) {
        if (error.response?.status === 404) {
          setMessage({
            type: 'info',
            text: 'Não há tipos de resíduo cadastrados no momento.',
          });
        } else {
          setMessage({
            type: 'error',
            text: error.response?.data?.message || 'Erro ao carregar tipos de resíduo.',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWasteTypes();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);

    try {
      await api.post<CreateCollectionResponse>('/collections', {
        wasteTypeId: selectedType,
        weight: parseFloat(weight),
      });

      setMessage({
        type: 'success',
        text: 'Coleta registrada com sucesso!',
      });
      setSelectedType('');
      setWeight('');
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao registrar coleta. Tente novamente.',
      });
    } finally {
      setSubmitting(false);
    }
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

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Registrar Coleta
        </Typography>

        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            select
            fullWidth
            label="Tipo de Resíduo"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            required
            margin="normal"
            disabled={submitting}
          >
            {wasteTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name} ({type.points} pontos/kg)
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Peso (kg)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            margin="normal"
            inputProps={{ step: '0.1', min: '0.1' }}
            disabled={submitting}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={!selectedType || !weight || submitting}
          >
            {submitting ? <CircularProgress size={24} /> : 'Registrar Coleta'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default WasteCollection; 