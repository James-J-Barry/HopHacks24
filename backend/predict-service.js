const tf = require("@tensorflow/tfjs-node");

// Load the model
let model;
const loadModel = async () => {
    model = await tf.loadGraphModel("file://path/to/model/model.json");
};
loadModel();

// Function to preprocess the image and make a prediction
const predictImage = async (imageBuffer) => {
    // Decode the image buffer to a tensor
    const image = tf.node.decodeImage(imageBuffer);

    // Preprocess the image (resize, normalize, etc. as required by your model)
    const input = tf.image
        .resizeBilinear(image, [224, 224])
        .expandDims(0)
        .toFloat()
        .div(tf.scalar(255));

    // Make prediction
    const predictions = await model.predict(input).data();

    // Process predictions (e.g., get the class with the highest probability)
    const topPrediction = predictions.indexOf(Math.max(...predictions));

    return topPrediction; // Replace with actual label or further processing
};

module.exports = { predictImage };
