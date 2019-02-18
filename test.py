import tensorflow as tf
import numpy as np

model = tf.keras.models.load_model("trained.hdf5")

mnist = tf.keras.datasets.mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0

# a = []
# # current = np.reshape(np.float32(x_train[1]), (28, 28))
# current = x_test[1]
# current = (current * 255).astype("uint8")
# image = Image.fromarray(current)
# image.show()

current = x_test[0]
prediction = model.predict(np.array([current]))
print(np.argmax(prediction))