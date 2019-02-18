from PIL import Image
import tensorflow as tf
import numpy as np
mnist = tf.keras.datasets.mnist

(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0

def show_image(index):
  a = []
  # current = np.reshape(np.float32(x_train[1]), (28, 28))
  current = x_test[index]
  current = (current * 255).astype("uint8")
  image = Image.fromarray(current)
  image.show()

show_image(9)
model = tf.keras.models.Sequential([
    tf.keras.layers.Flatten(input_shape=(28, 28)),
    tf.keras.layers.Dense(512, activation=tf.nn.relu),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10, activation=tf.nn.softmax)
])
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(x_train, y_train, epochs=5)
model.save(
    "trained.hdf5",
    overwrite=True,
    include_optimizer=True
)
# model.evaluate(x_test, y_test)
