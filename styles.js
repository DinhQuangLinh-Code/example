import styled from 'styled-components'
import { max } from 'src/styles/_mixin'

export const Blogs = styled.section`
  margin-top: 100px;
  .title-main {
    text-align: center;
    margin-bottom: 40px;
    display: block;
    font-size: 28px;
    font-weight: 900;
    line-height: 25px;
    text-transform: uppercase;
  }
  .blogs-list {
    .blog-item {
      margin-bottom: 30px;
      ${max.w767`
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
      `}
      &:last-child {
        margin-bottom: 0;
        ${max.w767`
          border-bottom: 0;
        `}
      }
      &:nth-child(even) {
        .image {
          order: 2;
          ${max.w767`
            order: 1;
          `}
        }
        .content {
          order: 1;
        }
      }
      .image {
        ${max.w767`
          margin-bottom: 15px;
        `}
        .thumbnail {
          position: relative;
          &:before {
            content: '';
            display: block;
            padding-bottom: 65%;
          }
          img {
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
          }
        }
      }
      .content {
        color: #111;
        .title {
          font-size: 20px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .description {
          font-weight: 500;
          text-align: justify;
          line-height: 22px;
          height: 220px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 10;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          ${max.w991`
            line-height: 20px;
            height: 200px;
          `}
          * {
            margin: 0;
          }
        }
        .read-more {
          margin: 20px auto 0;
          a {
            padding: 6px 15px;
            font-size: 14px;
            font-weight: 500;
            color: #fff;
            border: 1px solid #111;
            background-color: #111;
            text-transform: uppercase;
            display: inline-block;
            transition: all 0.2s;
            &:hover {
              color: #111;
              background-color: #fff;
            }
          }
        }
      }
    }
  }
`
