# 2. Базовые конструкции Python
# 2.3. Циклы

# A.Раз, два, три! Ёлочка, гори!
while input() != 'Три!':
    print('Режим ожидания...')
print('Ёлочка, гори!')

# B.Зайка — 3
i = 0
while (s := input()) != 'Приехали!':
    if 'зайка' in s:
        i = i + 1
print(i)

# C.Считалочка
beg = int(input())
end = int(input())
for i in range(beg, end + 1):
    print(i, end=' ')

# D.Считалочка 2.0
beg = int(input())
end = int(input())
if beg < end:
    for i in range(beg, end + 1):
        print(i, end=' ')
else:
    for i in range(beg, end - 1, -1):
        print(i, end=' ')

# E.Внимание! Акция!
summ = 0
while (price := float(input())) != 0:
    if price >= 500:
        price *= 0.9
    summ += price
print(summ)

# F.НОД
int_in_1 = int(input())
int_in_2 = int(input())
while int_in_2 != 0:
    int_in_1, int_in_2 = int_in_2, int_in_1 % int_in_2
print(int_in_1)

# G.НОК
int_in_1 = int(input())
int_in_2 = int(input())
mult = int_in_1 * int_in_2
while int_in_2 != 0:
    int_in_1, int_in_2 = int_in_2, int_in_1 % int_in_2
print(mult // int_in_1)

# H.Излишняя автоматизация 2.0
str_in = str(input())
int_in = int(input())
for i in range(int_in):
    print(str_in)

# I.Факториал
int_in = int(input())
res = 1
if int_in != 0:
    for i in range(1, int_in + 1):
        res *= i
print(res)

# J.Маршрут построен
x = 0
y = 0
while (direction := input()) != 'СТОП':
    n = int(input())
    match direction:
        case 'ВОСТОК':
            x += n
        case 'ЗАПАД':
            x -= n
        case 'СЕВЕР':
            y += n
        case 'ЮГ':
            y -= n
print(y)
print(x)

# K.Цифровая сумма
int_in = int(input())
summ = 0
for i in str(int_in):
    summ += int(i)
print(summ)

# L.Сильная цифра
int_in = int(input())
max_int = 0
for i in str(int_in):
    if int(i) > max_int:
        max_int = int(i)
print(max_int)

# M.Первому игроку приготовиться 2.0
min_name = 'ЯЯЯЯЯЯЯ'
for i in range(1, int(input()) + 1):
    if (new_name := str(input())) < min_name:
        min_name = new_name
print(min_name)

# N.Простая задача
int_in = int(input())
if int_in != 1:
    flag = False
else:
    flag = True
for i in range(2, int_in // 2 + 1):
    if int_in % i == 0:
        flag = True
        break
print('NO' if flag else 'YES')

# O.Зайка - 4
cnt = 0
for i in range(int(input())):
    if 'зайка' in input():
        cnt += 1
print(cnt)

# P.А роза упала на лапу Азора 2.0
print('YES' if (x := input()) == x[::-1] else 'NO')

# Q.Чётная чистота
res = ''
for i in str(input()):
    res += i if int(i) % 2 != 0 else ''
print(res)

# R.Простая задача 2.0
n = int(input())
res = []
i = 1
if n < 2:
    print(n)
while n > 1:
    i += 1
    if n % i == 0:
        res.append(str(i))
        n //= i
        i = 1
else:
    print(' * '.join(res))

# S.Игра в «Угадайку»
beg = 1
end = 1001
print((beg + end) // 2)
while (x := input()) != 'Угадал!':
    if x == 'Меньше':
        end = (beg + end) // 2
    elif x == 'Больше':
        beg = (beg + end) // 2
    print((beg + end) // 2)

# T.Хайпанём немножечко!
h_prev = 0
c = int(input())
e = -1
for i in range(c):
    b = int(input())
    m = b // 256 ** 2
    r = (b - m * 256 ** 2) // 256
    h = b - m * 256 ** 2 - r * 256
    if ((h >= 100) or (h != 37 * (m + r + h_prev) % 256)) and e == -1:
        e = i
    h_prev = 37 * (m + r + h_prev) % 256
print(e)