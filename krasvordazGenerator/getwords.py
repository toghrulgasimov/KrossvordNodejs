import os
import re

D = os.listdir("obost")
cnt = 0
out = open('sozler', 'w')
for p in D :
    f = open('obost/'+p, 'r')
    S = f.read()
    Q = '<h2 style="display:inline; font-size:20px; color:#0047AB">';
    L = [m.start() for m in re.finditer(Q, S)]
    for x in L :
        b = x+len(Q)
        s = b
        ans = ""
        ans2 = ""
        while S[s] != '<':
            ans = ans + S[s]
            s = s + 1
        s  = s + 5

        while S[s] != '<':
            ans2 = ans2 + S[s]
            s = s + 1

        #print(ans,ans2)
        out.write(ans + "^^^^" + ans2+"^^^^");
        cnt = cnt + 1
	print(cnt)

print(cnt)
out.close()
