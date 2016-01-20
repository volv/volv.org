import random
import math
import matplotlib.pyplot as plt

length = 10
shots = 10000
hits = 0.0

def shoot(squareLength) :
    return random.random() * squareLength, random.random() * squareLength

for i in range(shots) :
    x, y = shoot(length)
    distance = math.sqrt(x*x+y*y)

    if distance <= length :
        #plt.plot([x], [y], 'bo')
        plt.scatter(x, y, s=15, c='blue')
        hits += 1
    else :
        #plt.plot([x], [y], 'ro')
        plt.scatter(x, y, s=15, c='red')

print ((hits / shots) * 4)

plt.show()




