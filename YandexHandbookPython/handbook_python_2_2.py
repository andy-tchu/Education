# 2. Базовые конструкции Python
# 2.2. Условный оператор

# A.Просто здравствуй, просто как дела
print('Как Вас зовут?')
name = input()
print(f'Здравствуйте, {name}!')
print('Как дела?')
doing = input()
if doing == 'хорошо':
    print('Я за вас рада!')
elif doing == "плохо":
    print('Всё наладится!')

# B.Кто быстрее?
pet = int(input())
vas = int(input())
if pet > vas:
    print('Петя')
elif pet < vas:
    print('Вася')

# C.Кто быстрее на этот раз?
pet = int(input())
vas = int(input())
tol = int(input())
if tol < pet > vas:
    print('Петя')
elif pet < vas > tol:
    print('Вася')
elif pet < tol > vas:
    print('Толя')
else:
    print('Петя')

# D.Список победителей
pet = int(input())
vas = int(input())
tol = int(input())
if tol < pet > vas:
    first = 'Петя'
    if vas > tol:
        second = 'Вася'
        third = 'Толя'
    else:
        second = 'Толя'
        third = 'Вася'
elif pet < vas > tol:
    first = 'Вася'
    if pet > tol:
        second = 'Петя'
        third = 'Толя'
    else:
        second = 'Толя'
        third = 'Петя'
elif pet < tol > vas:
    first = 'Толя'
    if pet > vas:
        second = 'Петя'
        third = 'Вася'
    else:
        second = 'Вася'
        third = 'Петя'
else:
    first = 'Петя'
    second = 'Вася'
    third = 'Толя'
print(f'1. {first}')
print(f'2. {second}')
print(f'3. {third}')

# E.Яблоки
n = int(input())
m = int(input())
pet = 7 - 3 + 2 + n
vas = 6 + 3 + m

if pet > vas:
    print('Петя')
else:
    print('Вася')

# F.Сила прокрастинации
year = int(input())
if year % 4 == 0 and year % 100 != 0 or year % 400 == 0:
    print('YES')
else:
    print('NO')

# G.А роза упала на лапу Азора
int_in = input()
print('YES' if int_in == int_in[::-1] else 'NO')

# H.Зайка — 1
str_in = input()
if 'зайка' in str_in:
    print('YES')
else:
    print('NO')

# I.Первому игроку приготовиться
names_list = [input(), input(), input()]
print(min(names_list))


# J.Лучшая защита — шифрование
str_in = input()
first = int(str_in[0]) + int(str_in[1])
second = int(str_in[1]) + int(str_in[2])
print(str(first) + str(second)) if first > second else print(str(second) + str(first))

# K.Красота спасёт мир
int_in_list = list(map(int, input()))
max_min = max(int_in_list) + min(int_in_list)
print('YES' if max_min == 2 * (sum(int_in_list) - max_min) else 'NO')

# L.Музыкальный инструмент
a, b, c = int(input()), int(input()), int(input())
print('YES' if max(a, b, c) < a + b + c - max(a, b, c) else 'NO')

# M.Властелин Чисел: Братство общей цифры
elf, dwarf, human = input(), input(), input()
if elf[0] == dwarf[0] == human[0]:
    print(elf[0])
elif elf[1] == dwarf[1] == human[1]:
    print(elf[1])

# N.Властелин Чисел: Две Башни
int_in_list = list(map(int, input()))
second = str(max(int_in_list)) + str(max(sorted(int_in_list)[:-1]))
if int_in_list.count(0) == 1:
    first = str(min(sorted(int_in_list)[1:])) + str(min(int_in_list))
elif int_in_list.count(0) == 2:
    first = second
else:
    first = str(min(int_in_list)) + str(min(sorted(int_in_list)[1:]))
second = str(max(int_in_list)) + str(max(sorted(int_in_list)[:-1]))
print(first, second)

# O.Властелин Чисел: Возвращение Цезаря
int_in_list = list(map(int, (input() + input())))
print(str(max(int_in_list)) + str((sum(int_in_list) - max(int_in_list) - min(int_in_list)) % 10)
      + str(min(int_in_list)))

# P.Легенды велогонок возвращаются: кто быстрее?
pet = int(input())
vas = int(input())
tol = int(input())
if tol < pet > vas:
    first = 'Петя'
    if vas > tol:
        second = 'Вася'
        third = 'Толя'
    else:
        second = 'Толя'
        third = 'Вася'
elif pet < vas > tol:
    first = 'Вася'
    if pet > tol:
        second = 'Петя'
        third = 'Толя'
    else:
        second = 'Толя'
        third = 'Петя'
elif pet < tol > vas:
    first = 'Толя'
    if pet > vas:
        second = 'Петя'
        third = 'Вася'
    else:
        second = 'Вася'
        third = 'Петя'
else:
    first = 'Петя'
    second = 'Вася'
    third = 'Толя'
print(f'{"": ^8}{first: ^8}{"": ^8}')
print(f'{second: ^8}{"": ^8}{"": ^8}')
print(f'{"": ^8}{"": ^8}{third: ^8}')
print(f'{"II": ^8}{"I": ^8}{"III": ^8}')

# Q.Корень зла
a = float(input())
b = float(input())
c = float(input())
if a == 0 and b == 0 and c == 0:
    print('Infinite solutions')
elif (a == 0 and b == 0 and c != 0) or (b ** 2 < 4 * a * c):
    print('No solution')
elif b ** 2 == 4 * a * c:
    print(f'{-b / (2 * a):.2f}')
elif a == 0:
    print(f'{-c / b:.2f}')
else:
    roots = [(-b - (b ** 2 - 4 * a * c) ** 0.5) / (2 * a), (-b + (b ** 2 - 4 * a * c) ** 0.5) / (2 * a)]
    roots.sort()
    print(f'{round(roots[0], 2)} {round(roots[1], 2)}')

# R.Территория зла
a = int(input())
b = int(input())
c = int(input())
m = max(a, b, c)
n = min(a, b, c)
d = a + b + c - m - n
if m**2 == (d**2 + n**2):
    print('100%')
else:
    if m**2 > (d**2 + n**2):
        print("велика")
    else:
        if m**2 < (d**2 + n**2):
            print('крайне мала')

# S.Автоматизация безопасности
x = float(input())
y = float(input())
if (x**2 + y**2) > 100:
    print('Вы вышли в море и рискуете быть съеденным акулой!')
else:
    if ((x >= 0 and y >= 0) and ((x ** 2 + y ** 2) <= 25)) or ((y < 0) and ((((x + 1)**2) / 4 - 9) <= y)) \
            or ((y > 0) and (-7 <= x <= -4) and ((-x * 5 / 4) < y)) or ((y > 0) and (-4 < x < 0) and (y <= 5)):
        print('Опасность! Покиньте зону как можно скорее!')
    else:
        print('Зона безопасна. Продолжайте работу.')

# T.Зайка — 2
str_in_1 = input()
str_in_2 = input()
str_in_3 = input()
res = ''
if 'зайка' in str_in_1:
    res = str_in_1
if 'зайка' in str_in_2:
    if res == "":
        res = str_in_2
    else:
        if str_in_2 <= res:
            res = str_in_2
if 'зайка' in str_in_3:
    if res == '':
        res = str_in_3
    else:
        if str_in_3 <= res:
            res = str_in_3
if res != '':
    print(f'{res} {len(res)}')
    