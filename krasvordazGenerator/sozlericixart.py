f = open('sozler', 'r')
s = f.read()
a = s.split("^^^^")
print(len(a))
t = 0;
max = -1
S = set()
cnt = 0
F = open('ancaqsozler/sozler', 'w')
for i in range(0,len(a)) :
    if a[t].find(',') == -1 and len(a[t]) > 30:
        cnt = cnt + 1
        print(a[t])
    S.add(len(a[t]))
    F.write(a[t].split(',')[0]+'\n')
    t = t + 2
    if(t >= len(a)) : break;

print(cnt)
print(S)

F.close()
