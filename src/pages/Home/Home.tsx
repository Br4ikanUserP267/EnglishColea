import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import carouselData from '../../data/carouselData.json';
import cardData from '../../data/cardData.json';

type CarouselItem = {
  imageSrc: string;
  caption: string;
};

type CardItem = {
  title: string;
  content: string;
};

const Home: React.FC = () => {
  const carouselItems: CarouselItem[] = carouselData;
  const cardItems: CardItem[] = cardData;

  return (
    <Box sx={{ margin: 'auto', maxWidth: '1200px', padding: '20px' }}>
      <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
        {carouselItems.map((item, index) => (
          <div key={index}>
            <img src={item.imageSrc} alt={`Reason ${index + 1}`} style={{ maxHeight: '500px', objectFit: 'cover' }} />
            <p className="legend" style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '10px' }}>{item.caption}</p>
          </div>
        ))}
      </Carousel>
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {cardItems.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
