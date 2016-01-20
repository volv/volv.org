from matplotlib import pyplot as plt
import numpy as np
from datetime import datetime as dt
import weightData

def suffix(d):
    return 'th' if 11<=d<=13 else {1:'st',2:'nd',3:'rd'}.get(d%10, 'th')

def custom_strftime(format, t):
    return t.strftime(format).replace('{S}', str(t.day) + suffix(t.day))

data = weightData.data

print("\n", custom_strftime('{S} %b %Y', dt.now()))
print("\n", len(data), " Days (Inclusive)")

plt.xkcd()

fig = plt.figure()
ax = fig.add_subplot(1, 1, 1)

plt.tick_params(\
    axis='both',       # changes apply to the x-axis
    which='both',      # both major and minor ticks are affected
    right='off',       # ticks along the bottom edge are off
    top='off',         # ticks along the top edge are off
    )

plt.xticks(np.arange(0, len(data), int(len(data)/10)))
plt.yticks(np.arange(min(data)-5, max(data)+5, int(len(data)/10)))

ax.set_ylim([min(data)-5, max(data)+5])

plt.annotate('150kg', xy=(1, 150), arrowprops=dict(arrowstyle='->'), xytext=(5, 154))

plt.annotate('140kg', xy=(21, 140), arrowprops=dict(arrowstyle='->'), xytext=(25, 144))

plt.annotate('130kg', xy=(44, 130), arrowprops=dict(arrowstyle='->'), xytext=(30, 128))

plt.annotate('Xmas', xy=(57, 130), arrowprops=dict(arrowstyle='->'), xytext=(50, 135))

plt.annotate('Oban', xy=(85, 125), arrowprops=dict(arrowstyle='->'), xytext=(85, 135))

loc120 = []
for i in range(len(data)) :
    if (data[i] < 120) and (data[i-1] >= 120) :
        loc120.append(i)

for loc in loc120 :
    plt.annotate('120kg', xy=(loc, 120), arrowprops=dict(arrowstyle='->'), xytext=(sum(loc120)/len(loc120), 127))

loc110 = []
for i in range(len(data)) :
    if (data[i] < 110) and (data[i-1] >= 110) :
        loc110.append(i)

for loc in loc110 :
    plt.annotate('110kg', xy=(loc, 110), arrowprops=dict(arrowstyle='->'), xytext=(sum(loc110)/len(loc110), 117))


plt.plot(data, '--')
plt.plot(data, '')

plt.xlabel('Days')
plt.ylabel('Weight (kg)')
plt.title('Weight - 29th Oct 2014 to ' + custom_strftime('{S} %b %Y', dt.now()))

plt.savefig("xkcd.png", format="png", transparent=True)
plt.show()

