import React from 'react'
import { Table as AntTable, Pagination } from 'antd'

import styled from 'styled-components'

const TableStyle = styled.div`
  .scroll-fixed {
    height: 8px;
    background-color: rgb(0 0 0 / 35%);
    border-radius: 4px;
    position: fixed;
    bottom: 20px;
    z-index: 2;
    :hover {
      background-color: rgb(0 0 0 / 70%);
    }
    &.scroll-fixed-down {
      background-color: rgb(0 0 0 / 70%);
    }
  }
`

const renderScroll = {
  arrElement: [],
  mouseY: 0,
  lengthElement: 0,
  activeScrollElement: 0,
  scroll: 0,
  to: 0,
  isCheckMouse: false,

  scrollbar: function (classScroll) {
    var elementClass = document.querySelector(classScroll)

    if (!renderScroll.init()) return false

    var element_clone = elementClass.cloneNode(false)
    element_clone.style.overflow = 'hidden'
    elementClass.parentNode.appendChild(element_clone)
    element_clone.appendChild(elementClass)

    renderScroll.arrElement[renderScroll.lengthElement++] = elementClass

    elementClass.sg = false

    elementClass.classNews = this.createDivElement('scroll-fixed', elementClass, element_clone)

    elementClass.classNews.onmousedown = function (e) {
      console.log('onmousedown')
      if (!this.elementClass.sg) {
        if (!e) e = window.event

        renderScroll.activeScrollElement = this.elementClass
        this.elementClass.yZ = e.screenX
        this.elementClass.sZ = elementClass.scrollWidth
        this.elementClass.sg = true

        this.className = 'scroll-fixed scroll-fixed-down'
      }
      return false
    }

    elementClass.classNews.onmouseover = function (e) {
      console.log(this.elementClass)
      if (!this.elementClass.sg) this.className = 'scroll-fixed scroll-fixed-over'
      return false
    }

    elementClass.classNews.onmouseout = function (e) {
      if (!this.elementClass.sg) this.className = 'scroll-fixed'
      return false
    }

    elementClass.changeOnscroll = function () {
      this.ratio = (this.offsetWidth - 2 * this.sh) / this.scrollWidth
      this.classNews.style.transform = `translate3d(${Math.floor(this.sh + this.scrollLeft * this.ratio)}px, 0px, 0px)`
    }

    elementClass.sh = 8

    elementClass.changeOnscroll()
    renderScroll.refresh()

    elementClass.onscroll = elementClass.changeOnscroll
    return elementClass
  },

  init: function () {
    if (window.oper || (!window.addEventListener && !window.attachEvent)) {
      return false
    }

    function addEvent(o, e, f) {
      if (window.addEventListener) {
        o.addEventListener(e, f, false)
        renderScroll.w3c = true
        return true
      }
      if (window.attachEvent) return o.attachEvent('on' + e, f)
      return false
    }

    addEvent(window.document, 'mousemove', renderScroll.onmousemove)
    addEvent(window.document, 'mouseup', renderScroll.onmouseup)
    addEvent(window, 'resize', renderScroll.refresh)
    return true
  },

  createDivElement: function (c, elementClass, element_clone) {
    var element = document.createElement('div')
    element.elementClass = elementClass
    element.className = c
    element_clone.appendChild(element)
    return element
  },

  clear: function () {
    clearTimeout(renderScroll.to)
    renderScroll.scroll = 0
    return false
  },

  refresh() {
    for (var i = 0, lengthElement = renderScroll.lengthElement; i < lengthElement; i++) {
      var element = renderScroll.arrElement[i]
      element.changeOnscroll()
      element.classNews.style.display = 'none'
      element.classNews.style.height = element.sh + 'px'
      element.classNews.style.width = Math.ceil(Math.max(element.sh * 0.5, element.ratio * element.offsetWidth) - 15) + 'px'
    }
  },

  onmousemove: function (e) {
    if (!e) e = window.event

    renderScroll.mouseX = e.screenX

    if (renderScroll.activeScrollElement.sg) {
      renderScroll.activeScrollElement.scrollLeft = (renderScroll.mouseX - renderScroll.activeScrollElement.yZ) / renderScroll.activeScrollElement.ratio
    }
  },

  onmouseup: function (e) {
    if (!e) e = window.event
    var target = e.target ? e.target : e.srcElement
    if (renderScroll.activeScrollElement && document.releaseCapture) renderScroll.activeScrollElement.releaseCapture()

    if (renderScroll.activeScrollElement) renderScroll.activeScrollElement.classNews.className = target.className.indexOf('scrollbar') > 0 ? 'scroll-fixed scroll-fixed-over' : 'scroll-fixed'
    document.onselectstart = ''
    renderScroll.clear()
    if (renderScroll.activeScrollElement.sg) {
      renderScroll.activeScrollElement.sg = false
    }
  },
}

export default class Table extends React.Component {
  componentDidMount() {
    var container = document.querySelector('.ant-table-body')
    var sbHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight)

    window.addEventListener('scroll', (e) => {
      const scrollFixed = document.querySelector('.scroll-fixed')
      if (scrollFixed) {
        let bottom = container.getBoundingClientRect().y + container.getBoundingClientRect().height
        if (bottom - sbHeight - 30 > 1 && window.screenTop > container.getBoundingClientRect().top - 100) {
          scrollFixed.style.display = 'block'
        } else {
          scrollFixed.style.display = 'none'
        }
      }
    })

    renderScroll.scrollbar('.ant-table-body')
  }

  render() {
    const { pagination, isShowScroll } = this.props
    return (
      <>
        {isShowScroll && (
          <TableStyle>
            <AntTable {...this.props} />
          </TableStyle>
        )}
        {!isShowScroll && (
          <div>
            <div
              style={{
                overflow: 'auto',
                maxWidth: '100%',
                boxSizing: 'border-box',
              }}>
              <div style={{ minWidth: 1200 }}>
                <AntTable {...this.props} pagination={false} />
              </div>
            </div>
            {pagination && <Pagination {...pagination} showTotal={null} style={{ marginTop: 20, textAlign: 'right' }} />}
          </div>
        )}
      </>
    )
  }
}
