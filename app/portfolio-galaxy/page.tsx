'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Box, Typography, Card, CardContent } from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

// Types
interface PlanetProps {
    position: [number, number, number];
    size: number;
    color: string;
    speed: number;
    label: string;
    value: string;
    change: number;
}

// Planet Component
function Planet({ position, size, color, speed, label, value, change }: PlanetProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    // Animation loop
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * speed * 0.5;
            // Bobbing effect
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2;
        }
    });

    return (
        <group position={position}>
            <mesh
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setHovered(!hovered)}
            >
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered ? 0.8 : 0.2}
                    roughness={0.4}
                    metalness={0.6}
                />
            </mesh>

            {/* 3D Text Label - always visible or on hover */}
            <Html distanceFactor={15}>
                <div style={{
                    pointerEvents: 'none',
                    textAlign: 'center',
                    color: 'white',
                    background: hovered ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.4)',
                    padding: '8px',
                    borderRadius: '8px',
                    opacity: hovered ? 1 : 0.7,
                    transition: 'all 0.3s',
                    backdropFilter: 'blur(4px)',
                    border: hovered ? `1px solid ${color}` : '1px solid transparent',
                    minWidth: '100px',
                    transform: 'translate3d(-50%, -150%, 0)'
                }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{label}</div>
                    <div style={{ fontSize: '0.9em' }}>{value}</div>
                    <div style={{ color: change >= 0 ? '#4ade80' : '#f87171', fontSize: '0.8em' }}>
                        {change > 0 ? '+' : ''}{change}%
                    </div>
                </div>
            </Html>

            {/* Orbit Ring (Visual aid) */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[position[0] - 0.05, position[0] + 0.05, 64]} />
                <meshBasicMaterial color="#ffffff" opacity={0.05} transparent side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

// Scene Setup
function GalaxyScene() {
    // Mock Data representing a portfolio
    const coins = useMemo(() => [
        { name: 'Bitcoin', symbol: 'BTC', price: '$64,230', value: '$45,000', change: 2.5, size: 2.5, color: '#f7931a', speed: 0.5, distance: 0 }, // Sun
        { name: 'Ethereum', symbol: 'ETH', price: '$3,450', value: '$22,000', change: -1.2, size: 1.8, color: '#627eea', speed: 0.8, distance: 6 },
        { name: 'Solana', symbol: 'SOL', price: '$145', value: '$8,500', change: 5.7, size: 1.4, color: '#14f195', speed: 1.2, distance: 10 },
        { name: 'Cardano', symbol: 'ADA', price: '$0.45', value: '$3,200', change: -0.5, size: 1.0, color: '#0033ad', speed: 0.6, distance: 14 },
        { name: 'Polkadot', symbol: 'DOT', price: '$7.20', value: '$2,100', change: 1.1, size: 0.9, color: '#e6007a', speed: 0.9, distance: 17 },
        { name: 'Dogecoin', symbol: 'DOGE', price: '$0.12', value: '$1,500', change: 8.4, size: 0.8, color: '#c2a633', speed: 1.5, distance: 20 },
    ], []);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={0.5}
            />

            {coins.map((coin, i) => {
                // Determine position based on "distance" from center (Bitcoin as center or just layout)
                // Let's arrange them in a spiral or concentric circles? 
                // Simple: Linear lineup for now or somewhat randomized circular positions
                const angle = (i / coins.length) * Math.PI * 2;
                const dist = coin.distance;
                // If BTC is distance 0, it's at center.
                // Others are orbiting.

                // Static orbit position for demo (they animate spin in place)
                const x = dist === 0 ? 0 : Math.cos(angle) * dist;
                const z = dist === 0 ? 0 : Math.sin(angle) * dist;

                return (
                    <Planet
                        key={coin.symbol}
                        position={[x, 0, z]}
                        size={coin.size}
                        color={coin.color}
                        speed={coin.speed}
                        label={coin.symbol}
                        value={coin.value}
                        change={coin.change}
                    />
                );
            })}
        </>
    );
}

export default function PortfolioGalaxyPage() {
    return (
        <Box sx={{ width: '100%', height: 'calc(100vh - 100px)', position: 'relative', overflow: 'hidden', borderRadius: 4, bgcolor: '#000' }}>
            {/* UI Overlay */}
            <Box sx={{ position: 'absolute', top: 24, left: 24, zIndex: 10, pointerEvents: 'none' }}>
                <Typography variant="h3" fontWeight="900" sx={{
                    background: 'linear-gradient(135deg, #22D3EE 0%, #a78bfa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 40px rgba(34, 211, 238, 0.4)',
                    letterSpacing: '-1px'
                }}>
                    PORTFOLIO GALAXY
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1, fontWeight: 500, letterSpacing: '1px' }}>
                    INTERACTIVE ASSET VISUALIZATION 🌌
                </Typography>
            </Box>

            <Box sx={{ position: 'absolute', bottom: 30, left: 30, zIndex: 10, pointerEvents: 'none' }}>
                <Card sx={{
                    bgcolor: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                    borderRadius: 4,
                    minWidth: 200
                }}>
                    <CardContent sx={{ '&:last-child': { pb: 2.5, px: 3, pt: 2.5 } }}>
                        <Typography variant="overline" color="text.secondary" fontWeight="bold">Space Legend</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#fff', boxShadow: '0 0 10px white' }} />
                                <Typography variant="body2" color="white" fontWeight="500">Planet Size = Value</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <AutoGraphIcon sx={{ fontSize: 16, color: '#22d3ee' }} />
                                <Typography variant="body2" color="white" fontWeight="500">Rotation Speed = Volatility</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            <Canvas camera={{ position: [0, 20, 25], fov: 45 }}>
                <GalaxyScene />
            </Canvas>
        </Box>
    );
}
