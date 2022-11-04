import math
import numpy

import cv2
from PIL import Image


def modifyPixel(pixelData, pixelPosition):
    x = pixelPosition[0]
    y = pixelPosition[1]

    if type(pixelData) in [int, float]:
        pixelData = [pixelData, pixelData, pixelData]

    pixelData = tuple(pixelData)

    r = pixelData[0]
    g = pixelData[1]
    b = pixelData[2]

    x = pixelPosition[0]
    y = pixelPosition[1]

    r = int((y + (math.sqrt(x ^ r) * math.pi)) + r) % 255
    g = int((x + (math.sqrt(y ^ g) * math.pi)) + g) % 255
    b = int((y + (math.sqrt(x ^ b) * math.pi)) + b) % 255

    return (
        int(r),
        int(g),
        int(b)
    )


def effect(image):
    pixelMap = image.load()

    for x in range(image.width):
        for y in range(image.height):
            pixelData = pixelMap[x, y]

            pixelMap[x, y] = modifyPixel(
                pixelData,
                (x, y)
            )
    return image


def resizeImage(image):
    x = image.width
    y = image.height

    while x * y > 30000:
        if x * y < 30000:
            break

        x = int(x / 1.5)
        y = int(y / 1.5)

    return image.resize(
        (x, y)
    )


cam = cv2.VideoCapture(0)

while True:
    ret, frame = cam.read()

    img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    im_pil = Image.fromarray(img)

    new_Image = resizeImage(im_pil)
    new_Image = effect(new_Image)

    open_cv_image = numpy.array(new_Image)

    open_cv_image = open_cv_image[:, :, ::-1].copy()

    width = int(open_cv_image.shape[1] * 250 / 100)
    height = int(open_cv_image.shape[0] * 250 / 100)
    dim = (width, height)

    resized = cv2.resize(open_cv_image, dim, interpolation=cv2.INTER_AREA)

    cv2.imshow("Frame", resized)

    cv2.waitKey(1)
