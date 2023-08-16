from PIL import Image
import os
import datetime

Image.MAX_IMAGE_PIXELS = 2300000000     #防止超过python限制导致报错

path_img = r'F:/要切的图片/'   #要切的图片路径
img_dir = os.listdir(path_img)
print(img_dir)

# 运行时间测试
start_time = datetime.datetime.now()
print('开始：', start_time)

overlap = 0  # 重叠区域的大小

for i in range(len(img_dir)):

    img = Image.open(path_img + img_dir[i])
    size_img = img.size
    print(size_img)

    size_x, size_y = size_img

    x = 0
    y = 0

    x_num = int((size_x - overlap) / (512 - overlap))
    print(x_num)
    y_num = int((size_y - overlap) / (512 - overlap))
    print(y_num)
    w = 512
    h = 512
    for k in range(x_num):
        for v in range(y_num):
            x_offset = k * (w - overlap)  #x轴方向的偏移量
            y_offset = v * (h - overlap)  # x轴方向的偏移量
            region = img.crop((x + x_offset, y + y_offset, x + w + x_offset, y + h + y_offset))
            print(region)

            if region == None:
                pass
            else:
                region.save('F:/切块结果/' + '3_' + '%d_%d' % (k, v) + '.png')   #输出位置和名称，v行k列，路径需要先创建好
                print(region)

end_time = datetime.datetime.now()
print('结束: ', end_time)
