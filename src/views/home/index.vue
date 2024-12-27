<template>
  <div style="margin-top: 20px">
    <QyTable
      :title="title"
      :data="data"
      :titleStyle="titleStyle"
    ></QyTable>
  </div>
</template>

<script setup>
import QyTable from '@/components/qy-table/index.vue'

const title = [
  {
    label: '姓名',
    value: 'username',
    style: {
      fontSize: '18px',
      color: '#4eba44',
      width: '50px',
    },
  },
  {
    label: '联系方式',
    value: 'phone',
    children: [
      {
        label: '手机',
        value: 'phone',
        children: [
          {
            label: '手机1',
            value: 'phone1',
          },
          {
            label: '电话1',
            value: 'telephone1',
          },
        ]
      },
      {
        label: '电话',
        value: 'telephone',
      },
    ]
  },
  {
    label: '地址',
    value: 'address',
  },
]

const data = [
  {
    username: '张三',
    phone1: '13511111111',
    telephone1: '13511111111',
    phone2: '13522222222',
    telephone2: '13522222222',
    telephone: '13533333333',
    address: '浙江省宁波市宁海县1',
  },
  {
    username: '李四',
    phone1: '13511111111',
    telephone1: '13511111111',
    phone2: '13522222222',
    telephone2: '13522222222',
    telephone: '13533333333',
    address: '浙江省宁波市宁海县2',
  },
  {
    username: '王五',
    phone1: '13511111111',
    telephone1: '13511111111',
    phone2: '13522222222',
    telephone2: '13522222222',
    telephone: '13533333333',
    address: '浙江省宁波市宁海县3',
  },
]

const titleStyle = {
  fontSize: '14px',
  width: '200px',
  textAlign: 'center',
}
</script>

<style lang="scss" scoped></style>
