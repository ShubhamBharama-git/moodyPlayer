import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("Loading models...");

  // Start webcam
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error(err);
      setExpression("Camera permission denied");
    }
  };

  // Load models
  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    setExpression("Click Detect");
    startVideo();
  };

  // Detect expression 
  const detect = async () => {
    if (!videoRef.current) return;

    const detections = await faceapi
      .detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceExpressions();

      const displaySize = {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    };

    const resized = faceapi.resizeResults(detections, displaySize);

    if (detections.length > 0) {
      const exp = detections[0].expressions;

      const maxExp = Object.keys(exp).reduce((a, b) =>
        exp[a] > exp[b] ? a : b
      );

      console.log("Expression:",maxExp);

      setExpression(maxExp.toUpperCase());
    } else {
      console.log("No face detected");
      setExpression("No face detected");
    }
  };

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <div className="width-full h-50 flex items-center gap-4">
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="rounded-xl shadow-lg"
          width="340"
          height="280"
        />
      </div>

      <button
        onClick={detect}
        className="mt-6 px-6 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition"
      >
        Detect Expression
      </button>
    </div>
  );
}
