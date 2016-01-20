import matplotlib.pyplot as plt
import math

length = 10

for i in range(length) :
	plt.plot([0, i], [10-i, 0])

#plt.xlim(0, 360)

#l = []

#for i in xrange(0, 361, 1) :
#	l.append(math.sin(i*(math.pi/180)))
#	print math.sin(i*(math.pi/180))

#plt.plot(l)

plt.show()
