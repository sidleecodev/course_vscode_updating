# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

# 基礎知識
# 用if False: 來取消執行以下段落(用tab來增加段落)
if False:
    celsius_str = input("請輸入現在攝氏幾度：")
    
    celsius = float(celsius_str)
    
    fahrenheit = celsius * (9/5) + 32
    
    # ctrl+1 單行註解，再按一次即可取消；選取後ctrl+4多行註解，ctrl+5取消多行註解
    # sep='' 輸出預設上前後都有空格，此語法是前後沒有空格
    # end='' 輸出預設上會換行，空字串表示不換行
    print("換算成華氏溫度是：",fahrenheit, sep='', end='')
    
    # 也能使用print(f'')或print(f"")來顯示，中間用{}表示變數
    print(f'現在溫度是華氏{fahrenheit}度')
    
    # 使用+號，必須統一格式，以下範例是都是字串
    # 較不常用
    fahrenheit_str = str(fahrenheit)
    print('現在溫度是華氏' + fahrenheit_str + '度')
 
# CH1運算式練習題
if False:
    name = input('請輸入巫師的名字:')
    number = float(input('請輸入你想加入幾克魔法粉末:'))
    
    total = 150 + number*2.5
    needed = total//100
    remaining = total%100
    
    # 用{xxx:g}來把float後面.0的部分隱藏起來
    # \n換行
    print(f' \n嗨，{name}巫師！調配報告如下：')
    print(f'調配出的藥水總量為：{total:g}毫升。')
    print(f'你需要準備：{needed:g}瓶大燒杯。')
    print(f'剩下不滿一瓶的{remaining:g}毫升，請裝在小試管中。')
    
    # 如果不宣告變數，也能在print中計算，用{}包起來，但可讀性低
    print(f'剩下不滿一瓶的{total%100:g}毫升，請裝在小試管中。')

# 串列，使用[]，此為基本介紹
if False:
    # 除了可以一般宣告陣列scores = [80,90,75]
    # 也可以先準備一個空清單，再指派進去
    scores=[]
    scores.append(80)
    scores.append(90)
    scores.append(75)
    print("目前的成績單:", scores)
    
    total = sum(scores)
    # len()串列長度
    average = total / len(scores)
    print("平均分數:", average)

# CH1資料容器練習題-1
if False:
    pot = ["草蛉蟲", "雙角獸角粉末", "節肢動物的眼睛", "河童的鱗片"]
    pot.pop() #.poo(元素第幾個位置)，沒有填寫預設上是最後一個位置
    pot.insert(0, "催狂魔的眼淚") #insert(位置,內容)
    pot[2] = "獨角獸的毛"
    pot.reverse() #將串列左右反轉
    print(pot)

# Dict字典，使用{}
# {"keys": "values",}
if False:
    vocab = {
        "apple": "蘋果",
        "banana": "香蕉",
        "cat": "貓咪"
    }
    # 新增/修改keys、values
    vocab["dog"] = "狗"
    word = input("請輸入你要查的英文單字:")
    # vocab.get(key, "找不到後的訊息")
    meaning = vocab.get(word, "抱歉，我的字典裡沒有這個字...")
    # ↑也可以使用meaning = vocab[word]，不過輸入沒有的字就會噴錯
    print("中文意思是: ", meaning)
    
# CH1資料容器練習題-2
if False:
    shop = {
        "泡麵": 50,
        "罐頭": 80,
        "純淨水": 100
        }
    shop["純淨水"] = 300
    shop["散彈槍子彈"] = 500
    # 檢查key是否存在的用法
    if "泡麵" in shop:
        print(f"泡麵還有貨！價格是{shop["泡麵"]}元")
    del shop["泡麵"]
    print("目前商店剩餘物資:", shop)

# set集合，裡面的值不會有重複的
if False:
    text = "吃葡萄不吐葡萄皮"
    # 轉成 Set，電腦會自動把重複的 "葡萄" 刪掉
    # 設定成set會是無序集合
    unique_words = set(text)
    print("這句話總共有", len(text), "個字")
    print("但是只有", len(unique_words), "個不重複的字")

# CH1資料容器練習題-3
if False:
    group01 = ["張三","李四","王五","張三","趙六"]
    group02 = ["李四","王五","神秘外星人X","趙六","李四"]
    all_people01 = set(group01)
    all_people02 = set(group02)
    print(all_people01, all_people02)
    # 注意：底下指令都必須建立在set上，需要將a、b轉為set
    # 也就是說，不會使用group01、02
    # a.intersection(b) a、b交集，亦可用a&b
    common = all_people01.intersection(all_people02)
    # a.difference(b) a有b沒有，亦可用a-b
    diff = all_people02.difference(all_people01)
    # a.union(b) a、b聯集，亦可用a|b
    everyone = all_people01.union(all_people02)

    print(f"所有名單為{everyone}")
    print(f'同時出現在「隊長名單」和「紅外線掃瞄」中的人員有{common}')
    print(f'偷偷溜進基地，卻沒有在隊長的白名單上的有{diff}')
    
# CH1綜合練習題
if True:
    menu = {
        "珍珠奶茶": 60,
        "宇宙紅茶": 30,
        "流星綠茶": 35
    }
    orders = ["珍珠奶茶", "珍珠奶茶", "宇宙紅茶"]
    
    kinds_order = set(orders)
    len_kinds_order = len(kinds_order)
    print(f'顧客總共點了{len_kinds_order}種飲料')
    
    print(f'第一杯飲料{orders[0]}是{menu["珍珠奶茶"]}元')
    
    money = int(input("請輸入您支付的金額："))
    remaining = money - 150
    print(f'找您{remaining}元')