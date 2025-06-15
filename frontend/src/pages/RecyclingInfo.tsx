import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
} from '@mui/material';

const recyclingInfo = [
  {
    title: 'Plástico',
    description:
      'Lave e seque as embalagens antes de descartar. Retire rótulos e tampas quando possível. Verifique o símbolo de reciclagem para identificar o tipo de plástico.',
    image: 'https://cempre.org.br/wp-content/uploads/2020/11/titimg-rec-platico.png'  },
  {
    title: 'Papel',
    description:
      'Separe jornais, revistas, cadernos e papelão. Remova grampos, clipes e fitas adesivas. Não recicle papéis engordurados ou com resíduos de comida.',
    image: 'https://images.tcdn.com.br/img/img_prod/1041864/500_folhas_papel_foto_glossy_brilhante_a4_115g_359399_1_f27f374550ddb6730fb770b04ff81856.jpg',
  },
  {
    title: 'Vidro',
    description:
      'Lave e seque as garrafas e potes. Remova tampas e rótulos. Não quebre o vidro, pois pode causar acidentes. Vidros temperados e espelhos não são recicláveis.',
    image: 'https://cempre.org.br/wp-content/uploads/2020/11/titimg-rec-vidro.png',
  },
  {
    title: 'Metal',
    description:
      'Lave latas de alumínio e aço. Amasse as latas para ocupar menos espaço. Separe tampas e anéis de latas. Panelas e objetos metálicos grandes devem ser descartados em pontos específicos.',
    image: 'https://www.rapiddirect.com/wp-content/uploads/2022/09/silver.webp',
  },
];

const RecyclingInfo = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography component="h1" variant="h4" gutterBottom align="center">
          Guia de Reciclagem
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Aprenda como separar corretamente os diferentes tipos de resíduos para
          garantir uma reciclagem eficiente.
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {recyclingInfo.map((info) => (
            <Box
              key={info.title}
              sx={{
                flex: '1 1 250px',
                minWidth: 0,
                maxWidth: { sm: 'calc(50% - 16px)', md: 'calc(25% - 24px)' },
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={info.image}
                  alt={info.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {info.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {info.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Dicas Gerais
          </Typography>
          <Typography variant="body1" paragraph>
            • Sempre verifique se o material está limpo e seco antes de descartar
          </Typography>
          <Typography variant="body1" paragraph>
            • Reduza o volume dos materiais quando possível (amassar latas, dobrar
            papelão)
          </Typography>
          <Typography variant="body1" paragraph>
            • Mantenha os materiais organizados em sacos ou caixas separadas
          </Typography>
          <Typography variant="body1" paragraph>
            • Em caso de dúvida sobre a reciclabilidade de um material, consulte
            o símbolo de reciclagem ou entre em contato com o suporte
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RecyclingInfo; 