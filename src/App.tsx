import { useEffect, useState } from "react";
import { Button } from "../components/ui/button"
import { Slider } from "../components/ui/slider";
import { parseBlob, type IAudioMetadata } from "music-metadata";

function App() {
  const filePath = 'https://samplelib.com/mp3/sample-15s-id3v2.mp3';
  const [currentSongData, setCurrentData] = useState<IAudioMetadata | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const readData = async () => {
      const file = await fetch(filePath).then(res => res.blob());
      const metadata = await parseBlob(file);
      setCurrentData(metadata)
      setCurrentAudio(new Audio(URL.createObjectURL(file)));
    }
    readData();
  }, [])

  return (
    <>
      <section className="flex h-[100vh]" id="main">
        <h4>Title: {currentSongData?.common.title}</h4>
        <h4>Artist: {currentSongData?.common.artist}</h4>
        <Button onClick={() => {
          if (currentAudio) {
            currentAudio?.play()
          }
        }}>Play</Button>
        <Button onClick={() => {
          if (currentAudio) {
            currentAudio?.pause();
          }
        }}>Pause</Button>
        <Button onClick={() => {
          if (currentAudio) {
            currentAudio?.pause();
            currentAudio.currentTime = 0;
          }
        }}>Stop</Button>
        <Slider
          defaultValue={[1]}
          max={1}
          step={0.01}
          className="mx-auto w-full max-w-xs"
          onValueChange={(value: number | readonly number[]) => {
            if (currentAudio) {
              currentAudio.volume = Number(value);
            }
          }}
          onValueCommitted={(value: number | readonly number[]) => {
            if (currentAudio) {
              currentAudio.volume = Number(value);
            }
          }}
        />
        <div>{currentAudio?.currentTime}</div>
      </section>
    </>
  )
}

export default App
