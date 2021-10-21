/* eslint-disable no-restricted-globals */
/*eslint no-undef: 0*/
// eslint-disable-next-line no-restricted-globals

// import { notification } from 'antd'
// import { v4 as uuidv4 } from 'uuid'

export const numberWithCommas = (x) => {
    const parts = x.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
}

export const distinctArray = (x) => {
    return Array.from(new Set(x.map((s) => s.value))).map((val) => {
        return {
            value: val,
            key: x.find((i) => i.value === val).key,
        }
    })
}

export const isFilterSelected = (filter) => {
    return filter && filter.key !== '-1'
}

export const isFilterNotSelected = (filter) => {
    return !filter || filter.key === '-1'
}

export const isObjectEmpty = (obj) => {
    return obj === undefined || obj === null || Object.keys(obj).length === 0
}

export const isArrayEmpty = (arr) => {
    return !arr || arr.length === 0 || !Array.isArray(arr)
}

export const isStrEmpty = (str) => {
    return str === undefined || str === null || str.length === 0 || str.trim().length === 0
}

export const getCoordinateOfElement = (id) => {
    const element = document.getElementById(id)
    if (isObjectEmpty(element)) {
        return null
    }
    const obj = {
        top: element.getBoundingClientRect().top,
        bottom: element.getBoundingClientRect().bottom,
        width: element.getBoundingClientRect().width,
        height: element.getBoundingClientRect().height,
        left: element.getBoundingClientRect().left,
        right: element.getBoundingClientRect().right,
        space: parseInt(window.getComputedStyle(element.parentElement).marginBottom, 10),
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop,
    }
    return obj
}

export const countCharInStr = (str, char) => {
    const found = []
    for (let i = 0; i < str.length; i++) {
        if (char === str[i]) found.push(i)
    }
    return found.length
}

export const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
    )
}

// export const showNotification = (type, item, action, cb?: Function) => {
//     notification[type]({
//         message: type === 'success' ? 'Notification' : 'Error',
//         description:
//             type === 'success'
//                 ? `${item} has been ${action}  successfully.`
//                 : `${item} ${action} failed.`,
//     })
//     //callback trigger
//     if (cb) cb()
// }

export const enablePending = () => {
    const element = document.getElementById('app-pending')
    if (element) element.style.display = 'block'
}

export const disablePending = () => {
    const element = document.getElementById('app-pending')
    if (element) element.style.display = 'none'
}

export const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]') //eslint-disable-line
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    const results = regex.exec(location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export const removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
        return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos
    })
}

export const changeToSlug = (str) => {
    str = str.toLowerCase()
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a')
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e')
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i')
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o')
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u')
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y')
    str = str.replace(/(đ)/g, 'd')
    str = str.replace(/([^0-9a-z-\s])/g, '')
    str = str.replace(/(\s+)/g, '-')
    str = str.replace(/^-+/g, '')
    str = str.replace(/-+$/g, '')
    return str
}

export const urlPath = (path) => {
    return `http://localhost:50001${path}`
}

export const pathName = (number) => {
    return location.pathname.split('/')[number]
}

export const removeHtmlTag = (text) => {
    const regex = /(<([^>]+)>)/gi
    return text.replace(regex, '')
}
