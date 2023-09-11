# 2. Базовые конструкции Python
# 2.4. Вложенные циклы

# A.Таблица умножения
int_in = int(input())
for i in range(int_in):
    for j in range(int_in):
        print((i + 1) * (j + 1), end=' ')
    print('')

# B.Не таблица умножения
int_in = int(input())
for i in range(1, int_in + 1):
    for j in range(1, int_in + 1):
        print(f'{j} * {i} = {i * j}')

# C.Новогоднее настроение
line = 1
cnt = 0
for i in range(1, int(input()) + 1):
    if cnt < line:
        cnt += 1
    else:
        print()
        line += 1
        cnt = 1
    print(i, end=' ')

# D.Суммарная сумма
res = 0
for i in range(int(input())):
    res += sum(map(int, list(input())))
print(res)

# E.Зайка — 5
cnt_areas = 0
cnt = 0
for i in range(int(input())):
    while (x := input()) != 'ВСЁ':
        if x == 'зайка':
            cnt += 1
    if cnt != 0:
        cnt_areas += 1
        cnt = 0
print(cnt_areas)

# F.НОД 2.0
n = int(input())
int_in_1 = int(input())
for i in range(n - 1):
    int_in_2 = int(input())
    while int_in_2 != 0:
        int_in_1, int_in_2 = int_in_2, int_in_1 % int_in_2
print(int_in_1)

# G.На старт! Внимание! Марш!
for i in range(1, int(input()) + 1):
    for j in range(2 + i, 0, -1):
        print(f'До старта {j} секунд(ы)')
    print(f'Старт {i}!!!')

# H.Максимальная сумма
name_max = ''
summ_max = 0
for i in range(int(input())):
    name = input()
    summ = sum(map(int, input()))
    if summ >= summ_max:
        name_max, summ_max = name, summ
print(name_max)

# I.Большое число
big = ''
for i in range(int(input())):
    big += max(input())
print(big)

# J.Мы делили апельсин
for i in range(1, (cnt := int(input())) - 1):
    if i == 1:
        print('А Б В')
    for j in range(1, cnt - i):
        print(f'{i} {j} {cnt - i - j}')

# K.Простая задача 3.0
cnt = 0
for i in range(int(input())):
    if (int_in := int(input())) > 1:
        flag = False
        for j in range(2, int_in // 2 + 1):
            if int_in % j == 0:
                flag = True
                break
        if not flag:
            cnt += 1
print(cnt)

# L.Числовой прямоугольник
n = int(input())
m = int(input())
width = len(str(n * m))
for i in range(1, n + 1):
    for j in range(m * (i - 1) + 1, m * i + 1):
        if j == m * i:
            print(str(j).rjust(width, ' '))
        else:
            print(str(j).rjust(width, ' '), end=' ')

# M.Числовой прямоугольник 2.0
n = int(input())
m = int(input())
width = len(str(n * m))
for i in range(1, n + 1):
    for j in range(i, i + n * (m - 1) + 1, n):
        if j == i + n * (m - 1):
            print(str(j).rjust(width, ' '))
        else:
            print(str(j).rjust(width, ' '), end=' ')

# N.Числовая змейка
n = int(input())
m = int(input())
width = len(str(n * m))
for i in range(1, n + 1):
    if i % 2:
        for j in range(m * (i - 1) + 1, m * i + 1):
            if j == m * i:
                print(str(j).rjust(width, ' '))
            else:
                print(str(j).rjust(width, ' '), end=' ')
    else:
        for j in range(m * i, m * (i - 1), -1):
            if j == m * (i - 1) + 1:
                print(str(j).rjust(width, ' '))
            else:
                print(str(j).rjust(width, ' '), end=' ')

# O.Числовая змейка 2.0
n = int(input())
m = int(input())
width = len(str(n * m))
for i in range(1, n + 1):
    for j in range(m):
        if not j % 2 and j != m - 1:
            print(str(i + 2 * n * (j // 2)).rjust(width, ' '), end=' ')
        elif not j % 2 and j == m - 1:
            print(str(i + 2 * n * (j // 2)).rjust(width, ' '))
        elif j % 2 and j != m - 1:
            print(str(2 * n * (j // 2 + 1) - (i - 1)).rjust(width, ' '), end=' ')
        else:
            print(str(2 * n * (j // 2 + 1) - (i - 1)).rjust(width, ' '))

# P.Редизайн таблицы умножения
size = int(input())
width = int(input())
for i in range(1, size + 1):
    for j in range(1, size + 1):
        if j != size:
            print(f'{(str(i * j) + " " if width % 2 != 0 else str(i * j)).center(width)}|', end='')
        else:
            print(f'{(str(i * j) + " " if width % 2 != 0 else str(i * j)).center(width)}')
    if i * j != size * size:
        print(f'{"-"* ((width + 1) * size - 1)}')

# Q.А роза упала на лапу Азора 3.0
cnt = 0
for i in range(int(input())):
    if (x := input()) == x[::-1]:
        cnt += 1
print(cnt)

# R.Новогоднее настроение 2.0
string = ''
lengths = [0]
for i in range(1, (cnt := int(input())) + 1):
    string += str(i) + ' '
    if i in (sum(range(j)) for j in range(i + 2)):
        lengths.append(len(string) - 1)
        string = ''
lengths.append(len(string) - 1)
d = 1
for i in range(1, cnt + 1):
    if i - 1 in (sum(range(j)) for j in range(i + 2)):
        print(f'{" " * ((max(lengths) - lengths[d]) // 2)}{i}', end=' ' if i != 1 else '\n')
        d += 1
    else:
        print(i, end='\n' if i in (sum(range(j)) for j in range(i + 2)) else ' ')

# S.Числовой квадрат
for i in range(int_in := int(input())):
    for j in range(int_in):
        res = str(min(i, j, int_in - i - 1, int_in - j - 1) + 1)
        print(res.rjust(len(str((int_in + 1) // 2)), ' '), end=' ' if j < int_in - 1 else '\n')

# T.Математическая выгода
c = int(input())
sum_max = 0
base = 0
for i in range(2, 11):
    a = c
    res = ''
    while a > 0:
        res = str(a % i) + res
        a = a // i
    sum = 0
    for ch in res:
        sum = int(ch) + sum
    if sum > sum_max:
        base = i
        sum_max = sum
print(base)
