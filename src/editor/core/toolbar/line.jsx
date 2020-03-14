import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { DragSource } from 'react-dnd';
import { compose } from '../../../utility';
import LineIcon from '../../../assets/line.svg';
import c from '../../constants';
import styles from './line.styles';

export const linePreview = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAADCAYAAABlE6q2AAAK0GlDQ1
BJQ0MgUHJvZmlsZQAASImVlwdUU2kWx7/30kNCSwgdQm/SO0gJPYCCdBCVkIQklBBSULErgyM4Fl
REsIzIiIiCY6GNBRHFwiBgwzogg4oyDhZERWUfsISZ3bO7Z//n3PN+ubnfvd995/vOuQ8AsgZLJM
qElQHIEkrFUcF+9ITEJDpuAEAABnigAUxZbImIERkZDhDNPP+uD3eRaES3rCdz/fv//1UqHK6EDQ
AUiXAqR8LOQvg0Yt/YIrEUABTCwGipVDTJvQhTxcgGER6eZN4UoyfzUFOnmToVExPlj7A5AHgSiy
XmAUByQvz0XDYPyUOKQdhOyBEIEc5H2JvNZ3EQbkN4TlZW9iSPIGye+pc8vL/lTJXnZLF4cp7uZU
r4AIFElMla/n++jv+trEzZTA1TxEh8cUjUNEO9Gdlhchamzo+YYQFnJh7q5ctCYmeYLfFPmmEOKy
BMvjZzfvgMpwmCmPI8UmbMDHMlgdEzLM6OktdKE/szZpglnq0ry4iV+/lcpjx/Hj8mfoZzBXHzZ1
iSER02G+Mv94tlUfL9c4XBfrN1g+S9Z0n+0q+AKV8r5ceEyHtnze6fK2TM5pQkyPfG4QYEzsbEyu
NFUj95LVFmpDyemxks90tyo+VrpciBnF0bKX+H6azQyBkGMYAPZEAIOIALxCAVZINMIAV0EAAEQA
JEyC8WQI6TlLtMOtmcf7ZouVjA40vpDOTWcelMIdtmDt3Bzt4dgMk7PH1E3tGm7iZEuz7ry2kBwL
0QcfJmfSwjAJqeAUD5MOszeoscr20AnOtiy8S5076pu4YBRKAEqEAT6AEjYA6sgQNwAZ7AFwSCUB
CBdJIIFgM20k8W0slSsBKsAwWgCGwDu0AZOAAOgSPgODgJGsBZcBFcATdAF7gDHoI+MAhegRHwAY
xDEISDyBAF0oT0IRPICnKA3CBvKBAKh6KgRCgF4kFCSAathDZARVAxVAYdhKqhn6Em6CJ0DeqG7k
P90BD0FvoMo2ASTIV1YVPYFnaDGXAYHAMvgnlwDpwH58Nb4FK4Aj4G18MX4RvwHbgPfgWPogBKAU
VDGaCsUW4of1QEKgmVhhKjVqMKUSWoClQtqhnVjrqF6kMNoz6hsWgKmo62RnuiQ9CxaDY6B70avR
ldhj6Crke3oW+h+9Ej6G8YMkYHY4XxwDAxCRgeZimmAFOCOYw5g7mMuYMZxHzAYrE0rBnWFRuCTc
SmY1dgN2P3YeuwLdhu7AB2FIfDaeKscF64CBwLJ8UV4PbgjuEu4Hpwg7iPeAW8Pt4BH4RPwgvx6/
El+KP48/ge/HP8OEGZYELwIEQQOITlhK2ESkIz4SZhkDBOVCGaEb2IMcR04jpiKbGWeJn4iPhOQU
HBUMFdYYGCQGGtQqnCCYWrCv0Kn0iqJEuSPymZJCNtIVWRWkj3Se/IZLIp2ZecRJaSt5CryZfIT8
gfFSmKNopMRY7iGsVyxXrFHsXXSgQlEyWG0mKlPKUSpVNKN5WGlQnKpsr+yizl1crlyk3K95RHVS
gq9ioRKlkqm1WOqlxTeaGKUzVVDVTlqOarHlK9pDpAQVGMKP4UNmUDpZJymTJIxVLNqExqOrWIep
zaSR1RU1VzUotTW6ZWrnZOrY+GopnSmLRM2lbaSdpd2md1XXWGOld9k3qteo/6mIa2hq8GV6NQo0
7jjsZnTbpmoGaG5nbNBs3HWmgtS60FWku19mtd1hrWpmp7arO1C7VPaj/QgXUsdaJ0Vugc0unQGd
XV0w3WFenu0b2kO6xH0/PVS9fbqXdeb0ifou+tL9DfqX9B/yVdjc6gZ9JL6W30EQMdgxADmcFBg0
6DcUMzw1jD9YZ1ho+NiEZuRmlGO41ajUaM9Y3nGa80rjF+YEIwcTPhm+w2aTcZMzUzjTfdaNpg+s
JMw4xplmdWY/bInGzuY55jXmF+2wJr4WaRYbHPossStnS25FuWW960gq1crARW+6y652DmuM8Rzq
mYc8+aZM2wzrWuse63odmE26y3abB5bWtsm2S73bbd9puds12mXaXdQ3tV+1D79fbN9m8dLB3YDu
UOtx3JjkGOaxwbHd84WTlxnfY79TpTnOc5b3Rudf7q4uoidql1GXI1dk1x3et6z43qFum22e2qO8
bdz32N+1n3Tx4uHlKPkx5/elp7Znge9Xwx12wud27l3AEvQy+W10GvPm+6d4r3j959PgY+LJ8Kn6
e+Rr4c38O+zxkWjHTGMcZrPzs/sd8ZvzF/D/9V/i0BqIDggMKAzkDVwNjAssAnQYZBvKCaoJFg5+
AVwS0hmJCwkO0h95i6TDazmjkS6hq6KrQtjBQWHVYW9jTcMlwc3jwPnhc6b8e8R/NN5gvnN0SACG
bEjojHkWaROZG/LMAuiFxQvuBZlH3Uyqj2aEr0kuij0R9i/GK2xjyMNY+VxbbGKcUlx1XHjcUHxB
fH9yXYJqxKuJGolShIbEzCJcUlHU4aXRi4cNfCwWTn5ILku4vMFi1bdG2x1uLMxeeWKC1hLTmVgk
mJTzma8oUVwapgjaYyU/emjrD92bvZrzi+nJ2cIa4Xt5j7PM0rrTjtBc+Lt4M3xPfhl/CHBf6CMs
Gb9JD0A+ljGREZVRkTmfGZdVn4rJSsJqGqMEPYlq2XvSy7W2QlKhD15Xjk7MoZEYeJD0sgySJJo5
SKDEsdMnPZd7L+XO/c8tyPS+OWnlqmsky4rGO55fJNy5/nBeX9tAK9gr2idaXBynUr+1cxVh1cDa
1OXd26xmhN/prBtcFrj6wjrstY9+t6u/XF699viN/QnK+bvzZ/4Lvg72oKFAvEBfc2em488D36e8
H3nZscN+3Z9K2QU3i9yK6opOjLZvbm6z/Y/1D6w8SWtC2dW1227t+G3Sbcdne7z/YjxSrFecUDO+
btqN9J31m48/2uJbuulTiVHNhN3C3b3VcaXtq4x3jPtj1fyvhld8r9yuv26uzdtHdsH2dfz37f/b
UHdA8UHfj8o+DH3oPBB+srTCtKDmEP5R56VhlX2f6T20/Vh7UOFx3+WiWs6jsSdaSt2rW6+qjO0a
01cI2sZuhY8rGu4wHHG2utaw/W0eqKToATshMvf075+e7JsJOtp9xO1Z42Ob33DOVMYT1Uv7x+pI
Hf0NeY2NjdFNrU2uzZfOYXm1+qzhqcLT+ndm7reeL5/PMTF/IujLaIWoYv8i4OtC5pfXgp4dLttg
VtnZfDLl+9EnTlUjuj/cJVr6tnr3lca7rudr3hhsuN+g7njjO/Ov96ptOls/6m683GLveu5u653e
d7fHou3gq4deU28/aNO/PvdN+Nvdt7L/leXy+n98X9zPtvHuQ+GH+49hHmUeFj5cclT3SeVPxm8V
tdn0vfuf6A/o6n0U8fDrAHXv0u+f3LYP4z8rOS5/rPq184vDg7FDTU9XLhy8FXolfjwwV/qPyx97
X569N/+v7ZMZIwMvhG/Gbi7eZ3mu+q3ju9bx2NHH3yIevD+FjhR82PRz65fWr/HP/5+fjSL7gvpV
8tvjZ/C/v2aCJrYkLEErOmRgEUYnBaGgBvqwAgJyKzQxcAxIXTM/aUoOnvgikC/4mn5/ApuQBQ5Q
tA7FoAwpEZZT9iJgiTkOfkmBTjC2BHR7n9U5I0R4fpXCRk2sR8nJh4pwsArhmAr+KJifF9ExNfK5
HN3gegJWd6tp8UFvniKTbT1CZVdjfbrgX/on8ArwEZk4A0RWgAAAAJcEhZcwAACxMAAAsTAQCanB
gAAAIDaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm
5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj
0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZG
Y6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly
9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbn
MuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xMD
wvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMD
A8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aW
ZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3
g6eG1wbWV0YT4K0aH8ygAAAFdJREFUOBFjXL58+f9Xr14xsLKyMvz//59hFNA/BBgZGRl+//7NIC
YmxsAItH40FugfBzhtZImMjGRYuXIlg5qaGjiWcKoclaBZCIBKp1u3bjGEh4czAAAMoRcFSYVshw
AAAABJRU5ErkJggg==`;

const lineSource = {
  beginDrag(props) {
    const { id } = props;
    return { id };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview(),
  };
}

type PropType = {
  connectDragPreview: Function,
  connectDragSource: Function,
  handleClick: Function,
  handleKeyDown: Function,
  classes: Object
}

class LineC extends React.PureComponent<PropType, *> {

  componentDidMount() {
    const preview = new Image();
    preview.src = linePreview;
    preview.onload = () => this.props.connectDragPreview && this.props.connectDragPreview(preview, { offsetX: 0, offsetY: 0 });
  }

  render() {
    const {
      connectDragSource, handleClick, classes, handleKeyDown,
    } = this.props;
    return ((
      connectDragSource && connectDragSource((
        <div
          role="button"
          tabIndex="0"
          onKeyDown={ev => handleKeyDown(ev, c.ItemTypes.LINE)}
          onClick={ev => handleClick(ev, c.ItemTypes.LINE)}
          className={classNames(classes.root, 'fieldOutClick')}
          data-testid="lineTool"
        >
          <LineIcon />
          <span className={classes.legend}>Line</span>
        </div>
      ))
    ));
  }

}

export const Line = compose(
  DragSource(c.ItemTypes.LINE, lineSource, collect),
  withStyles(styles, { withTheme: true }),
)(LineC);
