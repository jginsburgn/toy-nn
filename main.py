import tensorflow as tf
import numpy as np
from PIL import Image
tf.enable_eager_execution()


def show_image(image):
  current = image.numpy().astype("uint8")
  image = Image.fromarray(current)
  image.show()

img_raw = tf.read_file("image.jpg")

img = tf.image.decode_jpeg(img_raw, channels=1)
img = tf.image.resize_images([img], (28, 28), method=tf.image.ResizeMethod.AREA)[0]
img = tf.reshape(img, (28, 28))

# show_image(img)
img = img / 255


model = tf.keras.models.load_model("trained.hdf5")

# a = []
# # current = np.reshape(np.float32(x_train[1]), (28, 28))
# current = x_test[1]
# current = (current * 255).astype("uint8")
# image = Image.fromarray(current)
# image.show()

prediction = model.predict(np.array([img]))
print(np.argmax(prediction))