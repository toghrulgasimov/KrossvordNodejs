# -*- coding: utf-8 -*-
import sys

# print(c)\n",
#L = "ABCDEFGHXJKQLMNOPRSTUVYZ"
L = u"ƏZÇŞ"
import urllib2
path = 'obost/'
# for c in L :\n",
#     print(c)\n",
for c in L :
    print(c)
    c = c.encode('utf-8')
    S = set()
    f = open(path+c, 'a')
    for i in range(1,10000) :

        url = "https://obastan.com/az/dict/exp/byletter/"+c+ "?p="+str(i);
        print(url)
        contents = urllib2.urlopen(url)
        data = contents.read().split('\n')
        x = ''.join(data[115:])
        print(c,i)
        if(x in S) : break
        S.add(x)
        #print("https://obastan.com/az/dict/exp/byletter/"+c+ "?p="+str(i))
    for x in S :
        f.write(x)
    f.close()
# T = "Ü"
# contents = urllib2.urlopen("https://obastan.com/az/dict/exp/byletter/"+ T+ "?p=2")
# print(contents)
