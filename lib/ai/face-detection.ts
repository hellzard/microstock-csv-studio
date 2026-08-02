import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';

let model: blazeface.BlazeFaceModel | null = null;

export async function loadFaceDetectionModel() {
  if (model) return model;
  
  // Ensure tf backend is ready
  await tf.setBackend('webgl').catch(() => tf.setBackend('cpu'));
  await tf.ready();
  
  model = await blazeface.load();
  return model;
}

export async function detectFacesInImage(imageElement: HTMLImageElement): Promise<boolean> {
  try {
    const loadedModel = await loadFaceDetectionModel();
    // returnTensors = false, flipHorizontal = false
    const predictions = await loadedModel.estimateFaces(imageElement, false);
    
    // If predictions length > 0, we found at least one face
    return predictions.length > 0;
  } catch (error) {
    console.error("Face detection failed:", error);
    return false;
  }
}
