f = open('sozlerge', 'r')
s = f.read()
m = {}
k = s.split('\n')
F = open('sozlerinmesqlisti', 'w')
for t in k :
    p = False
    ans = ""
    for x in t :
        if x == '(':
            p = True
        if not p : ans = ans + x
        if(x == ')') :
            p = False
    F.write(ans+'\n')
F.close()
