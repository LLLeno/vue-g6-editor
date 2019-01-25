<template>
  <div class="editor">
    <div class="top-container">
      <div class="toolbar" ref="toolbar">
        <i
          data-command="undo"
          class="command iconfont icon-undo"
          title="撤销"
        ></i>
        <i
          data-command="redo"
          class="command iconfont icon-redo disable"
          title="重做"
        ></i>
        <span class="separator"></span>
        <i
          data-command="copy"
          class="command iconfont icon-copy-o"
          title="复制"
        ></i>
        <i
          data-command="paste"
          class="command iconfont icon-paster-o disable"
          title="粘贴"
        ></i>
        <i
          data-command="delete"
          class="command iconfont icon-delete-o"
          title="删除"
        ></i>
        <span class="separator"></span>
        <i
          data-command="zoomIn"
          class="command iconfont icon-zoom-in-o"
          title="放大"
        ></i>
        <i
          data-command="zoomOut"
          class="command iconfont icon-zoom-out-o"
          title="缩小"
        ></i>
        <i
          data-command="autoZoom"
          class="command iconfont icon-fit"
          title="适应画布"
        ></i>
        <i
          data-command="resetZoom"
          class="command iconfont icon-actual-size-o"
          title="实际尺寸"
        ></i>
        <span class="separator"></span>
        <i
          data-command="toBack"
          class="command iconfont icon-to-back"
          title="层级后置"
        ></i>
        <i
          data-command="toFront"
          class="command iconfont icon-to-front"
          title="层级前置"
        ></i>
        <span class="separator"></span>
        <i
          data-command="multiSelect"
          class="command iconfont icon-select"
          title="多选"
        ></i>
        <!-- <i data-command="addGroup" class="command iconfont icon-group disable" title="成组"></i>
        <i data-command="unGroup" class="command iconfont icon-ungroup disable" title="解组"></i> -->
      </div>
      <div class="data-opt">
        <el-button size="mini" type="primary" @click="saveFlow">保存</el-button>
        <!-- <el-button size="mini" type="primary" @click="downloadFlow">下载</el-button> -->
      </div>
    </div>
    <div class="bottom-container">
      <div class="left-pannel">
        <div class="itempannel-container" ref="itempannel">
          <img
            draggable="false"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjEgKDUxMTQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cCAyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPGNpcmNsZSBpZD0icGF0aC0xIiBjeD0iMzYiIGN5PSIzNiIgcj0iMzYiPjwvY2lyY2xlPgogICAgICAgIDxmaWx0ZXIgeD0iLTkuNyUiIHk9Ii02LjklIiB3aWR0aD0iMTE5LjQlIiBoZWlnaHQ9IjExOS40JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iZmlsdGVyLTIiPgogICAgICAgICAgICA8ZmVPZmZzZXQgZHg9IjAiIGR5PSIyIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIj48L2ZlT2Zmc2V0PgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiPjwvZmVHYXVzc2lhbkJsdXI+CiAgICAgICAgICAgIDxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93Qmx1ck91dGVyMSIgaW4yPSJTb3VyY2VBbHBoYSIgb3BlcmF0b3I9Im91dCIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIj48L2ZlQ29tcG9zaXRlPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC4wNCAwIiB0eXBlPSJtYXRyaXgiIGluPSJzaGFkb3dCbHVyT3V0ZXIxIj48L2ZlQ29sb3JNYXRyaXg+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5Z+656GA5rWB56iL5Zu+LTAxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTA2LjAwMDAwMCwgLTkzLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEwLjAwMDAwMCwgOTUuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iT3ZhbCI+CiAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIxIiBmaWx0ZXI9InVybCgjZmlsdGVyLTIpIiB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGwtb3BhY2l0eT0iMC45MiIgZmlsbD0iI0ZGRjJFOCIgZmlsbC1ydWxlPSJldmVub2RkIiB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIHN0cm9rZT0iI0ZGQzA2OSIgc3Ryb2tlLXdpZHRoPSIxIiBjeD0iMzYiIGN5PSIzNiIgcj0iMzUuNSI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8dGV4dCBpZD0i6LW35q2i6IqC54K5IiBmb250LWZhbWlseT0iUGluZ0ZhbmdTQy1SZWd1bGFyLCBQaW5nRmFuZyBTQyIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgbGluZS1zcGFjaW5nPSIxMiIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjY1Ij4KICAgICAgICAgICAgICAgICAgICA8dHNwYW4geD0iMTIiIHk9IjQxIj7otbfmraLoioLngrk8L3RzcGFuPgogICAgICAgICAgICAgICAgPC90ZXh0PgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="
            data-type="node"
            data-shape="flow-circle"
            data-size="72*72"
            data-color="#FA8C16"
            data-label="起止节点"
            class="getItem"
          />
          <img
            draggable="false"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODhweCIgaGVpZ2h0PSI1NnB4IiB2aWV3Qm94PSIwIDAgODggNTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjEgKDUxMTQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPgogICAgICAgIDxyZWN0IGlkPSJwYXRoLTEiIHg9IjAiIHk9IjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI0OCIgcng9IjQiPjwvcmVjdD4KICAgICAgICA8ZmlsdGVyIHg9Ii04LjglIiB5PSItMTAuNCUiIHdpZHRoPSIxMTcuNSUiIGhlaWdodD0iMTI5LjIlIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJmaWx0ZXItMiI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeD0iMCIgZHk9IjIiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiPjwvZmVPZmZzZXQ+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSI+PC9mZUdhdXNzaWFuQmx1cj4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiPjwvZmVDb21wb3NpdGU+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjA0IDAiIHR5cGU9Im1hdHJpeCIgaW49InNoYWRvd0JsdXJPdXRlcjEiPjwvZmVDb2xvck1hdHJpeD4KICAgICAgICA8L2ZpbHRlcj4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLln7rnoYDmtYHnqIvlm74tMDEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02LjAwMDAwMCwgLTEwNS4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC4wMDAwMDAsIDEwNy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJSZWN0YW5nbGUtMTUtQ29weSI+CiAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIxIiBmaWx0ZXI9InVybCgjZmlsdGVyLTIpIiB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGwtb3BhY2l0eT0iMC45MiIgZmlsbD0iI0U2RjdGRiIgZmlsbC1ydWxlPSJldmVub2RkIiB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICA8cmVjdCBzdHJva2U9IiMxODkwRkYiIHN0cm9rZS13aWR0aD0iMSIgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI3OSIgaGVpZ2h0PSI0NyIgcng9IjQiPjwvcmVjdD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDx0ZXh0IGlkPSLluLjop4ToioLngrkiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZ1NDLVJlZ3VsYXIsIFBpbmdGYW5nIFNDIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0ibm9ybWFsIiBsaW5lLXNwYWNpbmc9IjEyIiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjAuNjUiPgogICAgICAgICAgICAgICAgICAgIDx0c3BhbiB4PSIxNiIgeT0iMjkiPuW4uOinhOiKgueCuTwvdHNwYW4+CiAgICAgICAgICAgICAgICA8L3RleHQ+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
            data-type="node"
            data-shape="flow-rect"
            data-size="80*48"
            data-color="#1890FF"
            data-label="常规节点"
            class="getItem"
          />
          <img
            draggable="false"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODZweCIgaGVpZ2h0PSI3OHB4IiB2aWV3Qm94PSIwIDAgODYgNzgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjEgKDUxMTQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cCAzPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPHBhdGggZD0iTTQyLjY3MDM3MjIsMS42Njk5NTcyOCBMNzcuNjM1MzAyNiwzMy4wMjE4OTQ1IEM3OS4yODAwNjQ4LDM0LjQ5NjcwMDMgNzkuNDE3ODQxNywzNy4wMjU2MDk5IDc3Ljk0MzAzNTksMzguNjcwMzcyMiBDNzcuODQ2MTE4NSwzOC43Nzg0NTgzIDc3Ljc0MzM4ODcsMzguODgxMTg4MSA3Ny42MzUzMDI2LDM4Ljk3ODEwNTUgTDQyLjY3MDM3MjIsNzAuMzMwMDQyNyBDNDEuMTUwODI4OSw3MS42OTI1Njg3IDM4Ljg0OTE3MTEsNzEuNjkyNTY4NyAzNy4zMjk2Mjc4LDcwLjMzMDA0MjcgTDIuMzY0Njk3NDQsMzguOTc4MTA1NSBDMC43MTk5MzUxODMsMzcuNTAzMjk5NyAwLjU4MjE1ODI3MiwzNC45NzQzOTAxIDIuMDU2OTY0MSwzMy4zMjk2Mjc4IEMyLjE1Mzg4MTUsMzMuMjIxNTQxNyAyLjI1NjYxMTI5LDMzLjExODgxMTkgMi4zNjQ2OTc0NCwzMy4wMjE4OTQ1IEwzNy4zMjk2Mjc4LDEuNjY5OTU3MjggQzM4Ljg0OTE3MTEsMC4zMDc0MzEzMDMgNDEuMTUwODI4OSwwLjMwNzQzMTMwMyA0Mi42NzAzNzIyLDEuNjY5OTU3MjggWiIgaWQ9InBhdGgtMSI+PC9wYXRoPgogICAgICAgIDxmaWx0ZXIgeD0iLTguOCUiIHk9Ii02LjklIiB3aWR0aD0iMTE3LjUlIiBoZWlnaHQ9IjExOS40JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iZmlsdGVyLTIiPgogICAgICAgICAgICA8ZmVPZmZzZXQgZHg9IjAiIGR5PSIyIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIj48L2ZlT2Zmc2V0PgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiPjwvZmVHYXVzc2lhbkJsdXI+CiAgICAgICAgICAgIDxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93Qmx1ck91dGVyMSIgaW4yPSJTb3VyY2VBbHBoYSIgb3BlcmF0b3I9Im91dCIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIj48L2ZlQ29tcG9zaXRlPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC4wNCAwIiB0eXBlPSJtYXRyaXgiIGluPSJzaGFkb3dCbHVyT3V0ZXIxIj48L2ZlQ29sb3JNYXRyaXg+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5Z+656GA5rWB56iL5Zu+LTAxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNy4wMDAwMDAsIC0xODQuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC4wMDAwMDAsIDE4NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJQb2x5Z29uIj4KICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjEiIGZpbHRlcj0idXJsKCNmaWx0ZXItMikiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbC1vcGFjaXR5PSIwLjkyIiBmaWxsPSIjRTZGRkZCIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZT0iIzVDREJEMyIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJNNDIuMzM2NTc1NywyLjA0MjIyMDQ3IEM0MS4wMDY5NzUzLDAuODUwMDEwMjM5IDM4Ljk5MzAyNDcsMC44NTAwMTAyMzkgMzcuNjYzNDI0MywyLjA0MjIyMDQ3IEwyLjY5ODQ5Mzk2LDMzLjM5NDE1NzcgQzIuNjAzOTE4NTgsMzMuNDc4OTYwNCAyLjUxNDAzMDAyLDMzLjU2ODg0OSAyLjQyOTIyNzI5LDMzLjY2MzQyNDMgQzEuMTM4NzcyMTksMzUuMTAyNTkxMyAxLjI1OTMyNjk5LDM3LjMxNTM4NzIgMi42OTg0OTM5NiwzOC42MDU4NDIzIEwzNy42NjM0MjQzLDY5Ljk1Nzc3OTUgQzM4Ljk5MzAyNDcsNzEuMTQ5OTg5OCA0MS4wMDY5NzUzLDcxLjE0OTk4OTggNDIuMzM2NTc1Nyw2OS45NTc3Nzk1IEw3Ny4zMDE1MDYsMzguNjA1ODQyMyBDNzcuMzk2MDgxNCwzOC41MjEwMzk2IDc3LjQ4NTk3LDM4LjQzMTE1MSA3Ny41NzA3NzI3LDM4LjMzNjU3NTcgQzc4Ljg2MTIyNzgsMzYuODk3NDA4NyA3OC43NDA2NzMsMzQuNjg0NjEyOCA3Ny4zMDE1MDYsMzMuMzk0MTU3NyBMNDIuMzM2NTc1NywyLjA0MjIyMDQ3IFoiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDx0ZXh0IGlkPSLliIblj4noioLngrkiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZ1NDLVJlZ3VsYXIsIFBpbmdGYW5nIFNDIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0ibm9ybWFsIiBsaW5lLXNwYWNpbmc9IjEyIiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjAuNjUiPgogICAgICAgICAgICAgICAgICAgIDx0c3BhbiB4PSIxNiIgeT0iNDIiPuWIhuWPieiKgueCuTwvdHNwYW4+CiAgICAgICAgICAgICAgICA8L3RleHQ+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
            data-type="node"
            data-shape="flow-rhombus"
            data-size="80*72"
            data-color="#13C2C2"
            data-label="分叉节点"
            class="getItem"
          />
          <img
            draggable="false"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODhweCIgaGVpZ2h0PSI1NnB4IiB2aWV3Qm94PSIwIDAgODggNTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjEgKDUxMTQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cCA0PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPHJlY3QgaWQ9InBhdGgtMSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiByeD0iMjQiPjwvcmVjdD4KICAgICAgICA8ZmlsdGVyIHg9Ii04LjglIiB5PSItMTAuNCUiIHdpZHRoPSIxMTcuNSUiIGhlaWdodD0iMTI5LjIlIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJmaWx0ZXItMiI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeD0iMCIgZHk9IjIiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiPjwvZmVPZmZzZXQ+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSI+PC9mZUdhdXNzaWFuQmx1cj4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiPjwvZmVDb21wb3NpdGU+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjA0IDAiIHR5cGU9Im1hdHJpeCIgaW49InNoYWRvd0JsdXJPdXRlcjEiPjwvZmVDb2xvck1hdHJpeD4KICAgICAgICA8L2ZpbHRlcj4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLln7rnoYDmtYHnqIvlm74tMDEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMDIuMDAwMDAwLCAtMTk1LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA2LjAwMDAwMCwgMTk3LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IlJlY3RhbmdsZS0xNS1Db3B5LTM1Ij4KICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjEiIGZpbHRlcj0idXJsKCNmaWx0ZXItMikiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbC1vcGFjaXR5PSIwLjkyIiBmaWxsPSIjRjlGMEZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IHN0cm9rZT0iI0IzN0ZFQiIgc3Ryb2tlLXdpZHRoPSIxIiB4PSIwLjUiIHk9IjAuNSIgd2lkdGg9Ijc5IiBoZWlnaHQ9IjQ3IiByeD0iMjMuNSI+PC9yZWN0PgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPHRleHQgaWQ9IuaooeWei+iKgueCuSIgZm9udC1mYW1pbHk9IlBpbmdGYW5nU0MtUmVndWxhciwgUGluZ0ZhbmcgU0MiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIGxpbmUtc3BhY2luZz0iMTIiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC42NSI+CiAgICAgICAgICAgICAgICAgICAgPHRzcGFuIHg9IjE2IiB5PSIyOSI+5qih5Z6L6IqC54K5PC90c3Bhbj4KICAgICAgICAgICAgICAgIDwvdGV4dD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
            data-type="node"
            data-shape="flow-capsule"
            data-size="80*48"
            data-color="#722ED1"
            data-label="模型节点"
            class="getItem"
          />
        </div>
      </div>
      <div class="center-pannel">
        <div class="flow" ref="flow"></div>
        <div
          class="contextmenu"
          ref="contextmenu"
          style="position: absolute; z-index: 2;"
        >
          <div data-status="node-selected" class="menu" style="display: none;">
            <div data-command="copy" class="command disable">
              <span>复制</span>
              <!-- <span>copy</span> -->
            </div>
            <div data-command="delete" class="command disable">
              <span>删除</span>
              <!-- <span>delete</span> -->
            </div>
          </div>
          <div data-status="edge-selected" class="menu" style="display: none;">
            <div data-command="delete" class="command disable">
              <span>删除</span>
              <!-- <span>delete</span> -->
            </div>
          </div>
          <div data-status="group-selected" class="menu" style="display: none;">
            <div data-command="copy" class="command disable">
              <span>复制</span>
              <!-- <span>copy</span> -->
            </div>
            <div data-command="delete" class="command disable">
              <span>删除</span>
              <!-- <span>delete</span> -->
            </div>
            <div data-command="unGroup" class="command disable">
              <span>解组</span>
              <!-- <span>unGroup</span> -->
            </div>
          </div>
          <div
            data-status="canvas-selected"
            class="menu"
            style="display: block;"
          >
            <div data-command="undo" class="command disable">
              <span>撤销</span>
              <!-- <span>undo</span> -->
            </div>
            <div data-command="redo" class="command disable">
              <span>重做</span>
              <!-- <span>redo</span> -->
            </div>
            <div data-command="pasteHere" class="command disable">
              <span>粘贴</span>
              <!-- <span>pasteHere</span> -->
            </div>
          </div>
          <div data-status="multi-selected" class="menu" style="display: none;">
            <div data-command="copy" class="command disable">
              <span>复制</span>
              <!-- <span>copy</span> -->
            </div>
            <div data-command="paste" class="command disable">
              <span>粘贴</span>
              <!-- <span>paste</span> -->
            </div>
            <!-- <div data-command="addGroup" class="command disable">
              <span>归组</span>
              <span>addGroup</span>
            </div> -->
            <div data-command="delete" class="command disable">
              <span>删除</span>
              <!-- <span>delete</span> -->
            </div>
          </div>
        </div>
      </div>
      <div class="right-pannel">
        <div class="detail-pannel">
          <div ref="detailpannel">
            <div
              data-status="node-selected"
              class="pannel"
              style="display: none;"
            >
              <div class="pannel-title">节点</div>
              <div class="block-container">
                <div class="p name">
                  名称：
                  <el-input size="mini" v-model="nodeName"></el-input>
                </div>
                <div class="p size">
                  尺寸：
                  <el-input size="mini" v-model="nodeWidth"></el-input>
                  <el-input size="mini" v-model="nodeHeight"></el-input>
                </div>
                <div class="p color">
                  颜色：
                  <el-color-picker
                    v-model="nodeColor"
                    size="mini"
                  ></el-color-picker>
                </div>
              </div>
            </div>
            <div
              data-status="edge-selected"
              class="pannel"
              id="edge_detailpannel"
              style="display: none;"
            >
              <div class="pannel-title">边</div>
              <div class="block-container">
                <div class="p name">
                  名称：
                  <el-input size="mini" v-model="edgeName"></el-input>
                </div>
              </div>
            </div>
            <div
              data-status="group-selected"
              class="pannel"
              id="group_detailpannel"
              style="display: none;"
            >
              <div class="pannel-title">组</div>
              <div class="block-container">
                <div class="p name">
                  名称：
                  <el-input size="mini" v-model="groupName"></el-input>
                </div>
                <div class="p color">
                  颜色：
                  <el-color-picker
                    v-model="groupColor"
                    size="mini"
                  ></el-color-picker>
                </div>
              </div>
            </div>
            <div
              data-status="canvas-selected"
              class="pannel"
              id="canvas_detailpannel"
              style="display: none;"
            >
              <div class="pannel-title">画布</div>
              <div class="block-container">
                <el-checkbox v-model="gridCheck">网格对齐</el-checkbox>
              </div>
            </div>
            <div
              data-status="multi-selected"
              class="pannel"
              id="multi_detailpannel"
              style="display: block;"
            >
              <div class="pannel-title">多选</div>
              <div class="block-container">
                <div class="p color">
                  颜色：
                  <el-color-picker
                    v-model="multiColor"
                    size="mini"
                  ></el-color-picker>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="navigator">
          <span class="pannel-title">导航器</span>
          <div class="mini-map" ref="minimap"></div>
        </div>
        <div class="zoom-slider">
          <el-slider
            v-model="zoomRatio"
            show-input
            input-size="mini"
            :max="200"
            :format-tooltip="formatTooltip"
          ></el-slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor'
// import FLowData from '@/model/flow'
// import JsPDF from 'jspdf'

import '../../assets/icon/font.css'

export default {
  name: 'BaseFlow',
  props: {
    data: Object, // 传入数据
    getData: Function // 获取数据
  },
  components: {},
  data() {
    return {
      page: null,
      flow: null,
      graph: null,
      nodeId: null,
      nodeName: null,
      nodeWidth: null,
      nodeHeight: null,
      nodeColor: null,
      groupId: null,
      groupName: null,
      groupColor: null,
      edgeId: null,
      edgeName: null,
      multiId: [], // 多选模式选中的node节点id
      multiColor: null, // 多选模式下的color，仅以最后一个为代表颜色
      isMultiSelect: false, // 是否是多选模式
      gridCheck: false,
      zoomRatio: 100
    }
  },
  mounted() {
    this.initEditor()
  },
  watch: {
    nodeName(newValue) {
      this.flow.update(this.nodeId, {
        label: newValue
      })
    },
    nodeWidth(newValue) {
      this.flow.update(this.nodeId, {
        size: `${newValue}*${this.nodeHeight}`
      })
    },
    nodeHeight(newValue) {
      this.flow.update(this.nodeId, {
        size: `${this.nodeWidth}*${newValue}`
      })
    },
    multiColor(newValue) {
      this.multiId.forEach(id => {
        this.flow.update(id, {
          color: newValue
        })
      })
    },
    nodeColor(newValue, oldValue) {
      if (oldValue === null) return
      this.flow.update(this.nodeId, {
        color: newValue
      })
    },
    edgeName(newValue) {
      if (newValue === null) return
      this.flow.update(this.edgeId, {
        label: {
          text: newValue
        }
      })
    },
    groupName(newValue) {
      if (newValue === null) return
      this.flow.update(this.groupId, {
        label: newValue
      })
    },
    groupColor(newValue) {
      if (newValue === null) return
      this.flow.update(this.groupId, {
        color: newValue
      })
    },
    gridCheck(newValue) {
      newValue ? this.page.showGrid() : this.page.hideGrid()
    },
    zoomRatio(newValue) {
      this.graph.zoom(newValue / 100)
    }
  },
  methods: {
    /**
     * @description: 初始化编辑器
     */
    initEditor() {
      const editor = new G6Editor()
      // 关闭追踪反馈
      G6Editor.track(false)
      // 基础流程图
      this.flow = new G6Editor.Flow({
        graph: {
          container: this.$refs.flow
        },
        align: {
          grid: true // 网格对齐
        },
        grid: {
          cell: 20 // 网孔尺寸
        },
        shortcut: {
          zoomIn: true, // 开启放大快捷键
          zoomOut: true // 开启视口缩小快捷键
        }
      })
      // 流程图图类
      this.itempannel = new G6Editor.Itempannel({
        container: this.$refs.itempannel
      })
      // 缩略图
      this.minimap = new G6Editor.Minimap({
        container: this.$refs.minimap
      })
      // 命令工具
      this.toolbar = new G6Editor.Toolbar({
        container: this.$refs.toolbar
      })
      // 右键菜单
      this.contextmenu = new G6Editor.Contextmenu({
        container: this.$refs.contextmenu
      })
      // 详细信息面板
      this.detailpannel = new G6Editor.Detailpannel({
        container: this.$refs.detailpannel
      })

      // 通过editor添加关联
      editor.add(this.flow)
      editor.add(this.itempannel)
      editor.add(this.minimap)
      editor.add(this.toolbar)
      editor.add(this.contextmenu)
      editor.add(this.detailpannel)

      // 增强清晰度
      // const canvas = this.$refs.flow.childNodes[0].childNodes[0]
      // const clarity = 1.5 // 清晰度
      // const dpr = window.devicePixelRatio && window.devicePixelRatio >= clarity
      //   ? window.devicePixelRatio : clarity
      // const rect = canvas.getBoundingClientRect()
      // canvas.width = rect.width * dpr
      // canvas.height = rect.height * dpr
      // const ctx = canvas.getContext('2d')
      // ctx.scale(dpr, dpr)

      // 判断是否是多选模式
      editor.on('aftercommandexecute', ev => {
        switch (ev.command.name) {
          case 'multiSelect':
            this.multiId = [] // 多选前清空上一个状态
            this.isMultiSelect = true
            break
          case 'undo':
            this.isMultiSelect = false
            break
          default:
            break
        }
      })

      // 流图读取数据
      this.data && this.flow.read(this.data)

      // 获取流图的graph示例
      this.graph = this.flow.getGraph()
      // 居中画布中的内容
      this.graph.setFitView('cc')
      // 边形状映射
      this.graph.edge({
        style: {
          stroke: '#79838e'
        },
        shape: 'flow-polyline-round',
        labelRectStyle: {
          fill: '#ffffff'
        }
      })

      // 获取当前页
      this.page = editor.getCurrentPage()
      // 默认关闭网格对齐
      this.page.hideGrid()
      // 修改添加边的模型
      this.page.changeAddEdgeModel({
        shape: 'flow-polyline-round'
      })
      // 选中数据处理
      this.page.on('afteritemselected', ev => {
        // 判断数据类型
        switch (ev.item.type) {
          case 'node':
            if (!this.isMultiSelect) {
              this.nodeId = ev.item.model.id
              this.nodeName = ev.item.model.label;
              [this.nodeWidth, this.nodeHeight] = ev.item.model.size.split('*')
              this.nodeColor = ev.item.model.color
            } else {
              this.multiId.push(ev.item.model.id)
              this.multiColor = ev.item.model.color
            }
            break
          case 'edge':
            this.edgeId = ev.item.model.id
            this.edgeName = ev.item.model.label
              ? ev.item.model.label.text
              : null
            break
          case 'group':
            this.groupId = ev.item.model.id
            this.groupName = ev.item.model.label ? ev.item.model.label : null
            this.groupColor = ev.item.model.color
              ? ev.item.model.color
              : '#f2f4f5'
            break
          default:
            break
        }
      })

      // 取消多选
      this.page.on('beforeitemunselected', () => {
        this.isMultiSelect = false
      })

      // 自动更新
      this.graph.on('afterchangesize', () => {
        this.graph.update()
      })
    },

    /**
     * @description: 保存流图数据
     */
    saveFlow() {
      const data = this.flow.save()
      this.getData(data)
      // this.$message({
      //   message: '数据保存成功！',
      //   type: 'success'
      // })
    },

    /**
     * @description: 下载流图
     */
    // downloadFlow() {
    //   this.page.hideGrid()
    //   this.graph.setFitView('cc')
    //   const canvas = this.$refs.flow.childNodes[0].childNodes[0]

    //   const imgData = canvas.toDataURL('image/png')
    //   const pdf = new JsPDF({
    //     orientation: 'l', // 竖排
    //     unit: 'pt',
    //     format: 'a4'
    //   })
    //   // const width = 1190.55 // a3
    //   const pdfWidth = 840.51 // a4
    //   pdf.addImage(imgData, 'PNG', 0, 0,
    // pdfWidth, pdfWidth / canvas.width * canvas.height, '', 'FAST')
    //   pdf.save('download.pdf')
    // },

    /**
     * @description: 格式化
     */
    formatTooltip(val) {
      return `${val}%`
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor {
  position: relative;
  width: 100%;
  height: 100%;
  .top-container {
    position: absolute;
    padding: 5px 20px;
    width: 100%;
    border: 1px solid #e9e9e9;
    height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 8px 12px 0px rgba(0, 52, 107, 0.04);
    .toolbar {
      height: 100%;
      width: 80%;
      .command {
        width: 27px;
        height: 27px;
        margin: 0px 6px;
        border-radius: 2px;
        padding-left: 4px;
        display: inline-block;
        border: 1px solid rgba(2, 2, 2, 0);
      }
      .disable {
        color: rgba(0, 0, 0, 0.25);
      }
    }
    .data-opt {
      width: 20%;
      height: 100%;
      text-align: right;
    }
  }
  .bottom-container {
    padding-top: 41px;
    width: 100%;
    height: 100%;
    display: flex;
    background: #f7f9fb;
    justify-content: space-around;
    .title {
      display: flex;
      width: 100%;
      align-items: center;
      height: 34px;
      font-weight: 600;
      font-size: 16px;
      padding: 0 20px;
      background: #cfd4d9;
    }
    .left-pannel {
      width: 15%;
      min-width: 300px;
      height: 100%;
      padding: 20px;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      .itempannel-container {
        width: 199px;
        height: 192px;
        img {
          width: 92px;
          height: 96px;
          padding: 4px;
          margin-left: 4px;
          border-radius: 2px;
          border: 1px solid rgba(0, 0, 0, 0);
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
    .center-pannel {
      background: #ffffff;
      display: inline-block;
      width: 70%;
      height: 100%;
      border: 1px solid #dedbe2;
      .flow {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .contextmenu {
        margin: 0px;
        width: 200px;
        background: white;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        color: #000;
        font-size: 12px;
        display: none;
        .command {
          height: 12px;
          padding: 8px;
          box-sizing: content-box;
        }
        .command:hover {
          cursor: pointer;
          background: #e6f7ff;
        }
        .disable {
          color: rgba(0, 0, 0, 0.25);
        }
      }
    }
    .right-pannel {
      width: 15%;
      min-width: 300px;
      height: 100%;
      display: inline-flex;
      flex-direction: column;
      .detail-pannel {
        width: 100%;
        height: 70%;
        background: #f7f9fb;
        border-left: 1px solid #e6e9ed;
        font-size: 13px;
        .pannel-title {
          height: 32px;
          border-top: 1px solid #dce3e8;
          border-bottom: 1px solid #dce3e8;
          background: #ebeef2;
          color: #000;
          line-height: 28px;
          padding-left: 12px;
        }
        .block-container {
          padding: 16px 8px;
          .p {
            margin-bottom: 12px;
          }
          .p.name {
            .el-input {
              width: 60%;
              padding: 0 10px;
            }
          }
          .p.size {
            .el-input {
              width: 30%;
              padding: 0 10px;
            }
          }
          .p.color {
            .el-color-picker {
              vertical-align: middle;
            }
          }
        }
      }
      .navigator {
        width: 100%;
        height: 25%;
        flex-grow: 1;
        .pannel-title {
          display: block;
          height: 32px;
          border-top: 1px solid #dce3e8;
          border-bottom: 1px solid #dce3e8;
          background: #ebeef2;
          color: #000;
          line-height: 28px;
          padding-left: 12px;
        }
        .mini-map {
          width: 100%;
          height: calc(100% - 34px);
        }
      }
      .zoom-slider {
        width: 100%;
        height: 5%;
        padding: 5px 10px;
        background: #ffffff;
      }
    }
  }
}
</style>
