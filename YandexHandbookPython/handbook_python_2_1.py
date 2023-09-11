# 2. Базовые конструкции Python
# 2.1. Ввод и вывод данных. Операции с числами, строками. Форматирование

# A.Привет, Яндекс!
print("Привет, Яндекс!")

# B.Привет, всем!
print("Как Вас зовут?")
name = input()
print(f"Привет, {name}")

# C.Излишняя автоматизация
str_in = input()
print((str_in + '\n') * 3)

# D.Сдача
str_in = input()
print(int(int(str_in) - 2.5 * 38))

# E.Магазин
price = int(input())
weight = int(input())
money = int(input())
print(money - weight * price)

# F.Чек
name = input()
price = int(input())
weight = int(input())
money = int(input())
total = weight * price
change = money - total
print(f"Чек\n{name} - {weight}кг - {price}руб/кг\nИтого: {total}руб\nВнесено: {money}руб\nСдача: {change}руб")

# G.Делу — время, потехе — час
count = input()
print("Купи слона!\n" * int(count))

# H.Наказание
count = input()
str_in = input()
print(f"Я больше никогда не буду писать \"{str_in}\"!\n" * int(count))

# I.Деловая колбаса
minutes = int(input())
children = int(input())
print(children * minutes // 2)

# J.Детский сад — штаны на лямках
name = input()
chest = int(input())
group = chest // 100
number = chest % 10
bad = chest // 10 % 10
print(f"Группа №{group}.\n{number}. {name}.\nШкафчик: {chest}.\nКроватка: {bad}.")

# K.Автоматизация игры
numb = int(input())
new_numb = numb // 100 % 10 * 1000 + numb // 1000 * 100 + numb % 10 * 10 + numb // 10 % 10
print(new_numb)

# L.Интересное сложение
numb_one = int(input())
numb_two = int(input())
new_numb = (numb_one // 100 + numb_two // 100) % 10 * 100 + (numb_one // 10 % 10 + numb_two // 10 % 10) % 10 * 10 \
           + (numb_one % 10 + numb_two % 10) % 10
print(new_numb)

# M.Дед Мороз и конфеты
children = int(input())
sweets = int(input())
sweets_pch = sweets // children
left = sweets % children
print(sweets_pch)
print(left)

# N.Шарики и ручки
red = int(input())
green = int(input())
blue = int(input())
count = red + blue + 1
print(count)

# O.В ожидании доставки
hour = int(input())
minutes = int(input())
time = int(input())
new_hour = (hour * 60 + minutes + time) // 60 % 24
if new_hour < 10:
    new_hour = '0' + str(new_hour)
new_minutes = (hour * 60 + minutes + time) % 60
if new_minutes < 10:
    new_minutes = '0' + str(new_minutes)
print(f"{new_hour}:{new_minutes}")

# P.Доставка
a_len = int(input())
b_len = int(input())
speed = int(input())
time = float((b_len - a_len) / speed)
print(f"{time:.2f}")

# Q.Ошибка кассового аппарата
a_sum = int(input())
b_sum = input()
summ = int(a_sum + int(b_sum, 2))
print(f"{summ}")

# R.Сдача 10
b_sum = input()
a_sum = int(input())
summ = int(a_sum - int(b_sum, 2))
print(f"{summ}")

# S.Украшение чека
name = input()
price = int(input())
weight = int(input())
money = int(input())
total = weight * price
change = money - total
price = str(weight) + "кг * " + str(price) + "руб/кг"
total = str(total) + "руб"
money = str(money) + "руб"
change = str(change) + "руб"
print("================Чек================")
print("Товар:" + " " * (35 - 6 - len(name)) + f"{name}", sep="")
print("Цена:" + " " * (35 - 5 - len(price)) + f"{price}", sep="")
print("Итого:" + " " * (35 - 6 - len(total)) + f"{total}", sep="")
print("Внесено:" + " " * (35 - 8 - len(money)) + f"{money}", sep="")
print("Сдача:" + " " * (35 - 6 - len(change)) + f"{change}", sep="")
print("===================================")

# T.Мухи отдельно, котлеты отдельно
n_num = int(input())
m_num = int(input())
k_one = int(input())
k_two = int(input())
x_one = int((n_num * m_num - n_num * k_two) / (k_one - k_two))
x_two = n_num - x_one
print(f"{x_one} {x_two}")
