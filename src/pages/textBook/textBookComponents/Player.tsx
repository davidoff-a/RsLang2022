import { useState, useEffect } from 'react';

import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const useAudio = (url: string): [boolean, () => void] => {
  const [audio] = useState(new Audio());
  audio.src = url;

  const [playing, setPlaying] = useState(false);
  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (playing) {
      void audio.play();
    } else {
      void audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

export interface Props {
  url: string;
}

export const Player = ({ url }: Props) => {
  const [playing, toggle] = useAudio(url);
  return (
    <IconButton aria-label="play/pause" onClick={() => toggle()}>
      {playing ? (
        <VolumeOffIcon sx={{ height: 38, width: 38 }} />
      ) : (
        <VolumeUpIcon sx={{ height: 38, width: 38 }} />
      )}
    </IconButton>
  );
};
