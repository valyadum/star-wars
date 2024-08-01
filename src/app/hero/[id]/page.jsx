'use client';

import { Background, Controls, ReactFlow } from '@xyflow/react';
import React, { useCallback, useEffect, useState } from 'react';
import '@xyflow/react/dist/style.css';
import { useParams } from 'next/navigation';
import MovieModal from './MovieModal';
import Modal from 'react-modal';
import ShipModal from './ShipModal';
import {fetchFilmsInfo, fetchHeroes, fetchShipsInfo} from '../../api';

function HeroPage() {
  const [heroName, setHeroName] = useState('');
  const [films, setFilms] = useState([]);
  const [shipsHeroes, setShipsHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moviesNodes, setMoviesNodes] = useState([]);
  const [shipsNodes, setShipsNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShip, setSelectedShip] = useState(null);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [isShipModalOpen, setIsShipModalOpen] = useState(false);
  const id = useParams()?.id;

  useEffect(() => {
    Modal.setAppElement('body'); //show modal on this page
  }, []);

  useEffect(() => {
    const fetchHero = async () => {
      setLoading(true);
      try {
        const response = await fetchHeroes(id);
        setHeroName(response.name);
        setFilms(response.films);
        setShipsHeroes(response.starships);
      } catch (error) {
        console.error('Error fetching heroes:', error);
        alert('Error fetching heroes');
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, [id]);

  useEffect(() => {
    const fetchFilms = async () => {
      const nodes = [];
      for (let index = 0; index < films.length; index++) {
        const film = films[index];
        setLoading(true);
        try {
          const response = await new Promise((resolve) => {
            setTimeout(async () => {
              const result = await fetchFilmsInfo(film);
              resolve(result);
            }, 100 * index);
          });
          const ships = response.starships;
          nodes.push({
            id: `movie-${index}`,
            data: {
              label: response.title,
              ship: ships,
              film: response,
            },
            position: { x: 250, y: 100 * (index + 1) },
          });
        } catch (error) {
          console.error('Error fetching film:', error);
          alert('Error fetching films');
        } finally {
          setLoading(false);
        }
      }
      setMoviesNodes(nodes);
    };

    if (films.length > 0) {
      fetchFilms();
    }
  }, [films]);

  useEffect(() => {
    const fetchShips = async () => {
      for (let index = 0; index < shipsHeroes.length; index++) {
        const ship = shipsHeroes[index];
        try {
          const response = await new Promise((resolve) => {
            setTimeout(async () => {
              const result = await fetchShipsInfo(ship);
              resolve(result);
            }, 100 * index);
          });

          setShipsNodes((prevNodes) => [
            ...prevNodes,
            {
              id: `ship-${index}`,
              data: {
                label: response.name,
                idShip: response.id,
                ship: response,
              },
              type: 'output',
              position: { x: 500, y: 100 * (index + 1) },
            },
          ]);
        } catch (error) {
          console.error('Error fetching ship:', error);
          alert('Error fetching ship');
        }
      }
    };

    if (shipsHeroes.length > 0) {
      fetchShips();
    }
  }, [shipsHeroes]);

  useEffect(() => {
    const dynamicEdges = [];
    const edgeIds = new Set();

    moviesNodes.forEach((node) => {
      const edgeId = `e-hero-${node.id}`;
      if (!edgeIds.has(edgeId)) {
        edgeIds.add(edgeId);
        dynamicEdges.push({
          id: edgeId,
          source: 'hero',
          target: node.id,
        });
      }
    });

    moviesNodes.forEach((movieNode) => {
      shipsNodes.forEach((shipNode) => {
        if (movieNode.data.ship.includes(shipNode.data.idShip)) {
          const edgeId = `e-${movieNode.id}-${shipNode.id}`;
          if (!edgeIds.has(edgeId)) {
            edgeIds.add(edgeId);
            dynamicEdges.push({
              id: edgeId,
              source: movieNode.id,
              target: shipNode.id,
            });
          }
        }
      });
    });

    setEdges(dynamicEdges);
  }, [moviesNodes, shipsNodes]);

  const handleNodeClick = useCallback((event, node) => {
    if (node.id.startsWith('movie-')) {
      setSelectedMovie(node.data.film);
      setIsMovieModalOpen(true);
    } else if (node.id.startsWith('ship-')) {
      setSelectedShip(node.data.ship);
      setIsShipModalOpen(true);
    }
  }, []);
  const heroNode = {
    id: 'hero',
    type: 'input',
    data: { label: heroName },
    position: { x: 0, y: 0 },
    style: { backgroundColor: '#55a4d9', color: 'white' },
  };

  const initialNodes = [heroNode, ...moviesNodes, ...shipsNodes];

  return (
    <main>
      {loading ? (
        <p style={{ color:'white'}}>Loading...</p>
      ) : (
        <div style={{ width: '100vw', height: '100vh' }}>
          <ReactFlow
            nodes={initialNodes}
            edges={edges}
            onNodeClick={handleNodeClick}
          >
            <Background color="#ccc" variant="dots" />
            <Controls />
          </ReactFlow>
          <MovieModal
            isOpen={isMovieModalOpen}
            onRequestClose={() => setIsMovieModalOpen(false)}
            movie={selectedMovie}
          />
          <ShipModal
            isOpen={isShipModalOpen}
            onRequestClose={() => setIsShipModalOpen(false)}
            ship={selectedShip}
          />
        </div>
      )}
    </main>
  );
}

export default HeroPage;
