/*
 * jAnsiVT
 *
 * jQuery Ansi/Ascii Virtual Terminal Emulator
 * Based on the work of Ken Rockot "Rudimentary VT100/Xterm emulator": https://github.com/krockot/jsvt
 *
 * Author: R3n Pi2 <r3npi2@gmail.com> https://github.com/R3nPi2/
 * Verion: 0.1.1
 * Repository: https://github.com/R3nPi2/jansivt 
 * Documentation: https://github.com/R3nPi2/jansivt 
 * License: jAnsiVT is released under the GNU Affero General Public License version 3. Read LICENSE file.
 * 
 */

(function($) {

  $.jAnsiVT = function(element, options) {

    var colorSchemes = {
      greyOnBlack : [
        //0: black (normal)
        '#000000',
        //1: red (normal)
        '#aa0000',
        //2: green (normal)
        '#00aa00',
        //3: yellow (normal)
        '#aa5500',
        //4: blue (normal)
        '#0000aa',
        //5: magenta (normal)
        '#aa00aa',
        //6: cyan (normal)
        '#00aaaa',
        //7: white (normal)
        '#aaaaaa',
        //8: black (bold)
        '#000000',
        //9: red (bold)
        '#ff5555',
        //10: green (bold)
        '#55ff55',
        //11: yellow (bold)
        '#ffff55',
        //12: blue (bold)
        '#5555ff',
        //13: magenta (bold)
        '#ff55ff',
        //14: cyan (bold)
        '#55ffff',
        //15: white (bold)
        '#ffffff'
      ],
      whiteOnBlack : [
        '#000000',
        '#aa0000',
        '#00aa00',
        '#aa5500',
        '#0000aa',
        '#aa00aa',
        '#00aaaa',
        '#ffffff',
        '#000000',
        '#ff5555',
        '#55ff55',
        '#ffff55',
        '#5555ff',
        '#ff55ff',
        '#55ffff',
        '#ffffff'
      ],
      blackOnWhite: [
        '#ffffff',
        '#aa0000',
        '#00aa00',
        '#aa5500',
        '#0000aa',
        '#aa00aa',
        '#00aaaa',
        '#000000',
        '#ffffff',
        '#ff5555',
        '#55ff55',
        '#ffff55',
        '#5555ff',
        '#ff55ff',
        '#55ffff',
        '#000000'
      ],
      blackOnLightYellow: [
        '#ffffdd',
        '#aa0000',
        '#00aa00',
        '#aa5500',
        '#0000aa',
        '#aa00aa',
        '#00aaaa',
        '#000000',
        '#ffffdd',
        '#ff5555',
        '#55ff55',
        '#ffff55',
        '#5555ff',
        '#ff55ff',
        '#55ffff',
        '#000000'
      ],
      blackOnGrey: [
        '#aaaaaa',
        '#aa0000',
        '#00aa00',
        '#aa5500',
        '#0000aa',
        '#aa00aa',
        '#00aaaa',
        '#000000',
        '#aaaaaa',
        '#ff5555',
        '#55ff55',
        '#ffff55',
        '#5555ff',
        '#ff55ff',
        '#55ffff',
        '#000000'
      ],
      blackAndWhite: [
        '#ffffff',
        '#000000',
        '#000000',
        '#000000',
        '#000000',
        '#000000',
        '#000000',
        '#000000',
        '#ffffff',
        '#000000',
        '#000000',
        '#000000',
        '#000000',
        '#000000',
        '#000000',
        '#000000'
      ],
      whiteAndBlack: [
        '#000000',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#000000',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff'
      ],
      greyAndBlack: [
        '#000000',
        '#aaaaaa',
        '#aaaaaa',
        '#aaaaaa',
        '#aaaaaa',
        '#aaaaaa',
        '#aaaaaa',
        '#aaaaaa',
        '#000000',
        '#aaaaaa',
        '#aaaaaa',
        '#aaaaaa',
        '#aaaaaa',
        '#aaaaaa',
        '#aaaaaa',
        '#aaaaaa'
      ],
      greenAndBlack: [
        '#000000',
        '#33ff66',
        '#33ff66',
        '#33ff66',
        '#33ff66',
        '#33ff66',
        '#33ff66',
        '#33ff66',
        '#000000',
        '#33ff66',
        '#33ff66',
        '#33ff66',
        '#33ff66',
        '#33ff66',
        '#33ff66',
        '#33ff66'
      ],
      vt100: [
        '#000000',
        '#00ff00',
        '#00ff00',
        '#00ff00',
        '#00ff00',
        '#00ff00',
        '#00ff00',
        '#00ff00',
        '#000000',
        '#00ff00',
        '#00ff00',
        '#00ff00',
        '#00ff00',
        '#00ff00',
        '#00ff00',
        '#00ff00'
      ],
      /* Tango palette */
      gnomeTango: [
        '#000000',
        '#cc0000',
        '#4e9a06',
        '#c4a000',
        '#3465a4',
        '#75507b',
        '#06989a',
        '#d3d7cf',
        '#555753',
        '#ef2929',
        '#8ae234',
        '#fce94f',
        '#729fcf',
        '#ad7fa8',
        '#34e2e2',
        '#eeeeec'
      ],
      /* Linux palette */
      gnomeLinux: [
        '#000000',
        '#aa0000',
        '#00aa00',
        '#aa5500',
        '#0000aa',
        '#aa00aa',
        '#00aaaa',
        '#aaaaaa',
        '#555555',
        '#ff5555',
        '#55ff55',
        '#ffff55',
        '#5555ff',
        '#ff55ff',
        '#55ffff',
        '#ffffff'
      ],
      /* XTerm palette */
      gnomeXTerm: [
        '#000000',
        '#cd0000',
        '#00cd00',
        '#cdcd00',
        '#0000ee',
        '#cd00cd',
        '#00cdcd',
        '#e5e5e5',
        '#7f7f7f',
        '#ff0000',
        '#00ff00',
        '#ffff00',
        '#5c5cff',
        '#ff00ff',
        '#00ffff',
        '#ffffff'
      ],
      /* RXVT palette */
      gnomeRXVT: [
        '#000000',
        '#cd0000',
        '#00cd00',
        '#cdcd00',
        '#0000cd',
        '#cd00cd',
        '#00cdcd',
        '#faebd7',
        '#404040',
        '#ff0000',
        '#00ff00',
        '#ffff00',
        '#0000ff',
        '#ff00ff',
        '#00ffff',
        '#ffffff'
      ],
      /* Solarized palette (1.0.0beta2): http://ethanschoonover.com/solarized */
      gnomeSolarized: [
        '#073642',
        '#dc322f',
        '#859900',
        '#b58900',
        '#268bd2',
        '#d33682',
        '#2aa198',
        '#eee8d5',
        '#002b36',
        '#cb4b16',
        '#586e75',
        '#657b83',
        '#839496',
        '#6c71c4',
        '#93a1a1',
        '#fdf6e3'
      ],

    }

    var jansivt = this;

    jansivt.container = $(element), 
    element = element; 

    jansivt.title = "jAnsiVT";
    jansivt.onChangeTitle = function(title){};
    jansivt.onKeyboardInput = function(k){};
    jansivt.screen = [];
    jansivt.showCursor = true;
    jansivt.applicationKeyMode = false;
    jansivt.writeBuffer = "";

    // Matches an OSC sequence ESC]n;tX where n is a number, t is arbitrary text, and X is
    // the sequence terminator - either BEL (07) or ST (ESC\).
    jansivt.exprOSC = /^\x1b\](\d*);((?:[^\x07\x1b]|\x1b[^\\])*)(?:\x07|\x1b\\)/;

    // Matches any general case of CSI (ESC[A...T) where A is an optional modifier and 
    // T is a terminating character or pair selecting the control mode.  Several more peculiar sequences
    // are unsupported here.
    // regexp   =  ESC   [(A)?    (...)?    (T)
    jansivt.exprCSI = /^\x1b\[([?>!])?([0-9;]*)?([@A-Za-z`])/;

/*
 * Public methods
 */

    // Resize current terminal
    // @params:
    //  - width: terminal columns
    //  - height: terminal rows
    jansivt.resize = function(width, height) {

      var old_width = jansivt.cols;
      var old_height = jansivt.rows;

      //Increasing height
      if (old_height < height) {
        for(var j = old_height; j < height; ++j) {
          jansivt.screen.push([]);
          var row = $('<div/>').addClass('term-row').addClass('term-row-'+j);
          for(var i = 0; i < width; ++i) {
              jansivt.screen[j].push($("<pre/>").css("background", jansivt.settings.vtColors[0]).css("color", jansivt.settings.vtColors[7]).text(" ").addClass('term-col').addClass('term-col-'+i).appendTo(row));
          }
          jansivt.display.append(row);
        }
        //Increasing width
        if (old_width < width) {
          for(var j = 0; j < old_height; ++j) {
            for(var i = old_width; i < width; ++i) {
              jansivt.screen[j].push($("<pre/>").css("background", jansivt.settings.vtColors[0]).css("color", jansivt.settings.vtColors[7]).text(" ").addClass('term-col').addClass('term-col-'+i).appendTo($('.term-row-'+j)));
            }
          }
        //Decreasing or equal width
        } else {
          var rows = height - old_height;
          for(var j = 0; j < rows; ++j) {
            jansivt.screen[j] = jansivt.screen[j].slice(0,width);
            for(var i = width; i < old_width; ++i) {
              jansivt.display.find('.term-row-'+j+' .term-col-'+i).remove();
            }
          }
        }

      //Decreasing or equal height
      } else {
        var strip_rows = old_height - height;
        jansivt.screen = jansivt.screen.slice(strip_rows);
        for(var j = 0; j < strip_rows; ++j) {
          jansivt.display.children('.term-row-'+j).remove();
        }
        for(var j = 0; j < height; ++j) {
          var term_row = strip_rows + j;
          var row = jansivt.display.find('.term-row-'+term_row);
          row.removeClass('term-row-'+term_row).addClass('term-row-'+j);
          //Increasing width
          if (old_width < width) {
            for(var i = old_width; i < width; ++i) {
              jansivt.screen[j].push($("<pre/>").css("background", jansivt.settings.vtColors[0]).css("color", jansivt.settings.vtColors[7]).text(" ").addClass('term-col').addClass('term-col-'+i).appendTo(row));
            }
          //Decreasing or equal width
          } else {
            jansivt.screen[j] = jansivt.screen[j].slice(0,width);
            for(var i = width; i < old_width; ++i) {
              jansivt.display.find('.term-row-'+j+' .term-col-'+i).remove();
            }
          }
        }
      }

      _resizeBuffer(jansivt.defaultBuffer, width, height);
      _resizeBuffer(jansivt.alternateBuffer, width, height);

      jansivt.rows = height;
      jansivt.cols = width;

      var max_height = jansivt.rows*(jansivt.settings.fontSize+2);
      var max_width = jansivt.cols*(jansivt.settings.fontSize/2);
      jansivt.container.css('max-height',max_height+'px').css('max-width',max_width+'px').css('height',max_height+'px').css('width',max_width+'px');

      jansivt.forceRedraw = true;
      jansivt.updateDisplay();

    };

    // Writes a single character at the cursor in the current buffer.
    // Advances the cursor accordingly.
    // This function does not updates display. Take a look at jansivt.write(c) bellow.
    //  @params:
    //    - c: character to write
    jansivt.writeCharacter = function(c) {

      // Avoid rows overflow.
      if (jansivt.buffer.cursor.y >= jansivt.rows) {
        jansivt.buffer.cursor.y = jansivt.rows -1; 
        // Delete right
        if(typeof(jansivt.buffer.lines[jansivt.buffer.cursor.y]) != 'undefined')
          jansivt.buffer.lines[jansivt.buffer.cursor.y] = jansivt.buffer.lines[jansivt.buffer.cursor.y].slice(0, jansivt.buffer.cursor.x);
      }

      var line = jansivt.buffer.lines[jansivt.buffer.cursor.y];

      // Lazily translate tab characters to 4 spaces; no tabstop aligment yet
      if(c == '\x09') {
        for(var i = 0; i < 4; ++i)
          jansivt.writeCharacter(' ');
        return;
      }

      var cell = {chr:c, attr:{}};
      for(var k in jansivt.buffer.attr)
        cell.attr[k] = jansivt.buffer.attr[k];

      // Just to be shure...
      if (line !== undefined) {
        line[jansivt.buffer.cursor.x] = cell;
      }

      if(jansivt.buffer.cursor.x < jansivt.cols-1)
        _setCursorCol(jansivt.buffer.cursor.x + 1);
      // Avoid column overflow
      else if (jansivt.applicationKeyMode)
        _setCursorCol(jansivt.buffer.cursor.x + 1);
      else {
        var scrollBottom = jansivt.buffer.useScrollRegion ? jansivt.buffer.scrollBottom : jansivt.rows-1;
        if(jansivt.buffer.cursor.y == scrollBottom)
          _shiftLinesUp();
        else
          _setCursorRow(jansivt.buffer.cursor.y + 1);
        _setCursorCol(0);
      }

    };

    // Writes a character sequence to the terminal buffer and updates display.
    //  @params:
    //    - msg: character sequence to write
    jansivt.write = function(msg) {
      msg = jansivt.writeBuffer + msg;
      jansivt.writeBuffer = "";

      for(var i = 0; i < msg.length; ++i) {
        var c = msg[i];
        switch(c) {
          case '\x1b': // ESC
            // String may be incomplete here. Buffer until next Write.
            if(msg.length == i+1) {
              jansivt.writeBuffer = msg[i];
              return;
            }
            switch(msg[i+1]) {
              // Only parse OSC and CSI sequences (ESC] and ESC[)
              case '[':
              case ']':
                var control = _parseControlSequence(msg.substr(i));
                // Sequence may yet be incomplete. Buffer until next Write.
                if(control.retry == true) {
                  jansivt.writeBuffer = msg.substr(i);
                  return;
                }
                i += control.length - 1;
                break;
              case 'D':
                var scrollBottom = jansivt.buffer.useScrollRegion ? jansivt.buffer.scrollBottom : jansivt.rows-1;
                if(jansivt.buffer.cursor.y == scrollBottom)
                  _shiftLinesUp();
                else
                  _setCursorRow(jansivt.buffer.cursor.y + 1);
                ++i;
                break;
              case 'M':
                var scrollTop = jansivt.buffer.useScrollRegion ? jansivt.buffer.scrollTop : 0;
                if(jansivt.buffer.cursor.y == scrollTop)
                  _shiftLinesDown();
                else
                  _setCursorRow(jansivt.buffer.cursor.y - 1);
                ++i;
                break;
              // This is about character encoding. I don't thing we need to set character encoding.
              case '(':
              case ')':
                i += 2;
                break;
              //@todo: '=' => 'DECKPAM - Set alternate keypad mode'
              //@todo: '>' => 'DECKPNM - Set numeric keypad mode'
              case '=':
              case '>':
                ++i;
                break;
              default:
                // Give up semi-gracefully
                jansivt.writeCharacter(c);
            }
            break;
          case '\x07': //BEL
            jansivt.container.fadeOut('fast').fadeIn('fast');
            break;
          case '\x08': //BS (non-destructive)
            if(jansivt.buffer.cursor.x > 0)
              _setCursorCol(jansivt.buffer.cursor.x - 1);
            break;
          case '\x7f': //BS (destructive)
            if(jansivt.buffer.cursor.x > 0) {
              jansivt.buffer.lines[jansivt.buffer.cursor.y].splice(jansivt.buffer.cursor.x-1, 1);
              _setCursorCol(jansivt.buffer.cursor.x - 1);
            }
            break;
          case '\x0a': //LF
            var scrollBottom = jansivt.buffer.useScrollRegion ? jansivt.buffer.scrollBottom : jansivt.rows-1;
            if(jansivt.buffer.cursor.y == scrollBottom)
              _shiftLinesUp();
            _setCursor(0, jansivt.buffer.cursor.y+1);
            break;
          case '\x0d': //CR
            _setCursorCol(0);
            break;
          default:
            jansivt.writeCharacter(c);
        }
      }

      jansivt.updateDisplay();

    };

    // Updates terminal display acording to current buffer content.
    jansivt.updateDisplay = function() {

      // scroll display into view 
      jansivt.display[0].scrollIntoView(false);

      if(jansivt.forceRedraw || typeof(jansivt.oldScreen) == 'undefined' || jansivt.oldScreen.length != jansivt.rows || jansivt.oldScreen[0].length != jansivt.cols) {
        jansivt.oldScreen = [];
        for(var i = 0; i < jansivt.rows; ++i) {
          var row = [];
          jansivt.oldScreen.push(row);
          for(var j = 0; j < jansivt.cols; ++j) {
            row.push({attr: {}, chr: null});
          }
        }
        jansivt.forceRedraw = false;
      }

      for(var i = 0; i < jansivt.rows; ++i) {
        var line = jansivt.buffer.lines[i];
        for(var j = 0; j < jansivt.cols; ++j) {
          var cell = line[j];
          var chr = " ";
          var attr;
          if(typeof(cell) != 'undefined') {
            var inverse = cell.attr.inverse;
            var blink = cell.attr.blink;
            var bold = cell.attr.bold;
            var fgColor = jansivt.settings.vtColors[((blink || bold) ? 8 : 0) +
              (inverse ? cell.attr.bgColor : cell.attr.fgColor)];
            var bgColor = jansivt.settings.vtColors[(blink ? 8 : 0) +
              (inverse ? cell.attr.fgColor : cell.attr.bgColor)];
            var fontWeight = (bold && !jansivt.settings.ignoreBold) ? 'bold' : 'normal';
            attr = {background: bgColor, color: fgColor, 'font-weight': fontWeight };
            chr = cell.chr;
          }
          else {
            attr = {
              background: jansivt.settings.vtColors[0]
            };
          }

          if(	jansivt.oldScreen[i][j].attr.background != attr.background ||
            jansivt.oldScreen[i][j].attr.color != attr.color ||
            jansivt.oldScreen[i][j].chr != chr)
          {
            if ((jansivt.screen[i] !== undefined) && (jansivt.screen[i][j] !== undefined))
              jansivt.screen[i][j].css(attr).text(chr);
          }
          jansivt.oldScreen[i][j].attr = attr;
          jansivt.oldScreen[i][j].chr = chr;
        }
      }
      var cur = jansivt.buffer.cursor;
      // Pseudo-hide cursor.
      if (jansivt.showCursor) {
        var curAttr = {
          background: jansivt.settings.vtColors[7],
          color: jansivt.settings.vtColors[0],
        };
      } else {
        var curAttr = {
          background: jansivt.settings.vtColors[0],
          color: jansivt.settings.vtColors[7],
        };
      }

      if ((jansivt.screen[cur.y] !== undefined) && (jansivt.screen[cur.y][cur.x] !== undefined))
        jansivt.screen[cur.y][cur.x].css(curAttr);

      if ((jansivt.oldScreen[cur.y] !== undefined) && (jansivt.oldScreen[cur.y][cur.x] !== undefined))
        jansivt.oldScreen[cur.y][cur.x].attr = curAttr;

      // Add scroll spacing
      // @todo: set scroll outside terminal container
      if (jansivt.settings.changeWidthOnScroll && !jansivt.container.hasClass('scrolled') && (jansivt.container[0].scrollHeight > jansivt.container[0].clientHeight) ) {
        jansivt.container.addClass('scrolled');
        var max_width = jansivt.cols*(jansivt.settings.fontSize/2) + jansivt.settings.fontSize;
        jansivt.container.css('max-width',max_width+'px').css('width',max_width+'px');
      } else if (jansivt.container.hasClass('scrolled') && (jansivt.container[0].scrollHeight <= jansivt.container[0].clientHeight) ) {
        jansivt.container.removeClass('scrolled');
        var max_width = jansivt.cols*(jansivt.settings.fontSize/2);
        jansivt.container.css('max-width',max_width+'px').css('width',max_width+'px');
      }

    };

    // Change terminal font-size
    //  @params:
    //    - font_size: Integer required
    jansivt.changeFontSize = function (font_size) {
      if (!isNaN(parseFloat(font_size)) && isFinite(font_size)) {

        jansivt.settings.fontSize = font_size;

        // We are not going to delete previous rules to have no conflict with other plugins that should have add their own rules.
        // @todo: remove previously added rules.
        //document.styleSheets[0].removeRule();
        //document.styleSheets[0].removeRule();
        //document.styleSheets[0].removeRule();

        // Just added at the end
        document.styleSheets[0].insertRule(".jansivt-display pre, .jansivt-scroll pre { font-size:"+jansivt.settings.fontSize+"px;height:"+(jansivt.settings.fontSize+2)+"px;width:"+(jansivt.settings.fontSize/2)+"px}", 0);
        document.styleSheets[0].insertRule(".jansivt-display .term-row, .jansivt-scroll .term-row { max-height:"+(jansivt.settings.fontSize+2)+"px }", 0);
        document.styleSheets[0].insertRule(".jansivt-display, .jansivt-scroll { line-height:"+(jansivt.settings.fontSize+2)+"px }", 0);

        var max_height = jansivt.rows*(jansivt.settings.fontSize+2);
        var max_width = jansivt.cols*(jansivt.settings.fontSize/2);
        jansivt.container.css('max-height',max_height+'px').css('max-width',max_width+'px').css('height',max_height+'px').css('width',max_width+'px');

        jansivt.forceRedraw = true;
        jansivt.updateDisplay();

      } else {
        console.log("jansivt.changeFontSize error: Value is not a number");
      }
    };

    // Set a handler to receive title change events that occur via the OSC sequence.
    //  @params:
    //    - handler: function
    jansivt.ChangeTitle = function(handler) {
      jansivt.onChangeTitle = handler;
    };

    // Set a handler to receive keypress/keydown events.
    //  @params:
    //    - handler: function
    jansivt.KeyboardInput = function(handler) {
      jansivt.onKeyboardInput = handler;
    };

    // onKeyDown
    jansivt.keyInput = function(e) {

      if (e.charCode!=0)
        return;

      //@todo: we can't stop event, but we should catch keys that "unfocus" our terminal, like "TAB".
      //e.preventDefault();
      //e.stopPropagation();

      if(e.ctrl) {
        if(e.key >= 65 && e.key <= 90) {
          jansivt.write(String.fromCharCode(e.key - 64));
          jansivt.onKeyboardInput(e.key -64);
          return String.fromCharCode(e.key - 64);
        }
        switch(e.key) {
          case 'Key2':
            jansivt.write("\x00");
            jansivt.onKeyboardInput("\x00");
            return "\x00";
          case 'Key3':
          case 'LeftBracket':
            jansivt.write("\x1b");
            jansivt.onKeyboardInput("\x1b");
            return "\x1b";
          case 'Key4':
            jansivt.write("\x1c");
            jansivt.onKeyboardInput("\x1c");
            return "\x1c";
          case 'KeyRightBracket':
          case 'Key5':
            jansivt.write("\x1d");
            jansivt.onKeyboardInput("\x1d");
            return "\x1d";
          case 'Key6':
            jansivt.write("\x1e");
            jansivt.onKeyboardInput("\x1e");
            return "\x1e";
          case 'Key7':
            jansivt.write("\x1f");
            jansivt.onKeyboardInput("\x1f");
            return "\x1f";
          case 'Key8':
            jansivt.write("\x7f");
            jansivt.onKeyboardInput("\x7f");
            return "\x7f";
        }
      }

      switch(e.key) {
        case 'Backspace':
          jansivt.write("\x7f");
          jansivt.onKeyboardInput("\x7f");
          return "\x7f";
        case 'Tab':
          jansivt.write("\x09");
          jansivt.onKeyboardInput("\x09");
          return "\x09";
        case 'Escape':
          jansivt.write("\x1b");
          jansivt.onKeyboardInput("\x1b");
          return "\x1b";
        case 'PageUp':
          jansivt.write("\x1b[5~");
          jansivt.onKeyboardInput("\x1b[5~");
          return "\x1b[5~";
        case 'PageDown':
          jansivt.write("\x1b[6~");
          jansivt.onKeyboardInput("\x1b[6~");
          return "\x1b[6~";
        case 'End':
          jansivt.write("\x1b[4~");
          jansivt.onKeyboardInput("\x1b[4~");
          return "\x1b[4~";
        case 'Home':
          jansivt.write("\x1b[1~");
          jansivt.onKeyboardInput("\x1b[1~");
          return "\x1b[1~";
        case 'LeftArrow':
          if(jansivt.applicationKeyMode) {
            jansivt.write("\x1bOD");
            jansivt.onKeyboardInput("\x1bOD");
            return "\x1bOD";
	  }
          jansivt.write("\x1b[D");
          jansivt.onKeyboardInput("\x1b[D");
          return "\x1b[D";
        case 'UpArrow':
          if(jansivt.applicationKeyMode) {
            jansivt.write("\x1bOA");
            jansivt.onKeyboardInput("\x1bOA");
            return "\x1bOA";
	  }
          jansivt.write("\x1b[A");
          jansivt.onKeyboardInput("\x1b[A");
          return "\x1b[A";
        case 'RightArrow':
          if(jansivt.applicationKeyMode) {
            jansivt.write("\x1bOC");
            jansivt.onKeyboardInput("\x1bOC");
            return "\x1bOC";
	  }
          jansivt.write("\x1b[C");
          jansivt.onKeyboardInput("\x1b[C");
          return "\x1b[C";
        case 'DownArrow':
          if(jansivt.applicationKeyMode) {
            jansivt.write("\x1bOB");
            jansivt.onKeyboardInput("\x1bOB");
            return "\x1bOB";
	  }
          jansivt.write("\x1b[B");
          jansivt.onKeyboardInput("\x1b[B");
          return "\x1b[B";
        case 'Delete':
          jansivt.write("\x1b[3~");
          jansivt.onKeyboardInput("\x1b[3~");
          return "\x1b[3~";
        case 'Enter':
          jansivt.write("\n");
          jansivt.onKeyboardInput("\n");
          return "\n";
        case 'Space':
          jansivt.write(" ");
          jansivt.onKeyboardInput(" ");
          return " ";
        case 'F1':
          jansivt.write("\x1b[11~");
          jansivt.onKeyboardInput("\x1b[11~");
          return "\x1b[11~";
        case 'F2':
          jansivt.write("\x1b[12~");
          jansivt.onKeyboardInput("\x1b[12~");
          return "\x1b[12~";
        case 'F3':
          jansivt.write("\x1b[13~");
          jansivt.onKeyboardInput("\x1b[13~");
          return "\x1b[13~";
        case 'F4':
          jansivt.write("\x1b[14~");
          jansivt.onKeyboardInput("\x1b[14~");
          return "\x1b[14~";
        case 'F5':
          jansivt.write("\x1b[15~");
          jansivt.onKeyboardInput("\x1b[15~");
          return "\x1b[15~";
        case 'F6':
          jansivt.write("\x1b[17~");
          jansivt.onKeyboardInput("\x1b[17~");
          return "\x1b[17~";
        case 'F7':
          jansivt.write("\x1b[18~");
          jansivt.onKeyboardInput("\x1b[18~");
          return "\x1b[18~";
        case 'F8':
          jansivt.write("\x1b[19~");
          jansivt.onKeyboardInput("\x1b[19~");
          return "\x1b[19~";
        case 'F9':
          jansivt.write("\x1b[20~");
          jansivt.onKeyboardInput("\x1b[20~");
          return "\x1b[20~";
        case 'F10':
          jansivt.write("\x1b[21~");
          jansivt.onKeyboardInput("\x1b[21~");
          return "\x1b[21~";
        case 'F11':
          jansivt.write("\x1b[23~");
          jansivt.onKeyboardInput("\x1b[23~");
          return "\x1b[23~";
        case 'F12':
          jansivt.write("\x1b[24~");
          jansivt.onKeyboardInput("\x1b[24~");
          return "\x1b[24~";
        default:
          return String.fromCharCode(parseInt(e.which, 10));
      }

    };

    // onKeyPress
    jansivt.asciiInput = function(e) {

      if (e.charCode==0)
        return;
      if (e.charCode>127)
        return;

      //@todo: we can't stop event, but we should catch keys that "unfocus" our terminal, like "TAB".
      //e.preventDefault();
      //e.stopPropagation();

      var kcode = e.which;

      jansivt.write(String.fromCharCode(parseInt(kcode, 10)));
      jansivt.onKeyboardInput(String.fromCharCode(parseInt(kcode, 10)));
      return String.fromCharCode(parseInt(kcode, 10));

    };


/*
 * Private functions
 */

    var _setCursorCol = function(c) {
      _setCursor(c, jansivt.buffer.cursor.y);
    };

    var _setCursorRow = function(r) {
      _setCursor(jansivt.buffer.cursor.x, r);
    };

    var _setCursor = function(c, r) {
      jansivt.buffer.cursor.x = c;
      jansivt.buffer.cursor.y = r;
    };

    var _shiftLinesDown = function() {
      var scrollTop = jansivt.buffer.useScrollRegion ? jansivt.buffer.scrollTop : 0;
      var scrollBottom = jansivt.buffer.useScrollRegion ? jansivt.buffer.scrollBottom : jansivt.rows-1;
      jansivt.buffer.lines.splice(scrollBottom, 1);
      jansivt.buffer.lines.splice(scrollTop, 0, []);
    };

    var _shiftLinesUp = function() {

      var scrollTop = jansivt.buffer.useScrollRegion ? jansivt.buffer.scrollTop : 0;
      var scrollBottom = jansivt.buffer.useScrollRegion ? jansivt.buffer.scrollBottom : jansivt.rows-1;

      var line = jansivt.buffer.lines[scrollTop];

      // Scroll buffer
      if (jansivt.scrollBufferLines > 0) {

        var row = $('<div/>').addClass('term-row');
        if (line.length > 0) {
          for(var i = 0; i < line.length; ++i) {
            if ( (line[i] !== undefined) && (line[i].attr !== undefined) ) {
              var inverse = line[i].attr.inverse;
              var bold = line[i].attr.bold;
              var fgColor = jansivt.settings.vtColors[(bold ? 8 : 0) +
                (inverse ? line[i].attr.bgColor : line[i].attr.fgColor)];
              var bgColor = jansivt.settings.vtColors[0 +
                (inverse ? line[i].attr.fgColor : line[i].attr.bgColor)];
              var fontWeight = (bold && !jansivt.settings.ignoreBold) ? 'bold' : 'normal';
              var attr = {background: bgColor, color: fgColor, 'font-weight': fontWeight};
              var chr = line[i].chr;
              $("<pre/>").css(attr).text(chr).addClass('term-col').addClass('term-col-'+i).appendTo(row);
            } else {
              var attr = {background: jansivt.settings.vtColors[0], color: jansivt.settings.vtColors[7]};
              var chr = " ";
              $("<pre/>").css(attr).text(chr).addClass('term-col').addClass('term-col-'+i).appendTo(row);
            }
          }
        } else {
          $("<pre/>").css("background", jansivt.settings.vtColors[0]).css("color", jansivt.settings.vtColors[7]).text(" ").addClass('term-col').appendTo(row);
        }
        jansivt.scroll.append(row);
      
        if($('.jansivt-scroll .term-row').length > jansivt.scrollBufferLines) {
          $('.jansivt-scroll .term-row:first-child').remove();
        }

      }

      jansivt.buffer.scrollBuffer.push(line);

      if(jansivt.buffer.scrollBuffer.length > jansivt.scrollBufferLines) {
        jansivt.buffer.scrollBuffer.shift();
      }

      jansivt.buffer.lines.splice(scrollTop, 1);
      if(jansivt.buffer.lines.length < jansivt.rows)
        jansivt.buffer.lines.splice(scrollBottom, 0, []);

    };

    // Parse a CSI or OSC control sequence being written to the terminal
    // Returns:
    // {
    // 		length 	// number of inupt bytes consumed
    //  	retry   // optional boolean, if true the caller should wait until it has more data and resend
    // }
    var _parseControlSequence = function(seq) {
      var result = jansivt.exprOSC.exec(seq);
      if(result != null) {
        // Only support icon/window title changes here.  Silently ignore the rest.
        if(result[1] < 3) {
          jansivt.title = result[2];
          jansivt.onChangeTitle(result[2]);
        }
        return {length:result[0].length};
      }
      
      var result = jansivt.exprCSI.exec(seq);	
      // We have an incomplete CSI sequence, so give up and tell the caller to try again when it has more data
      if(result == null)
        return {length:seq.length, retry:true};

      // Pull out regexp groups
      var match = result[0];
      var modifier = typeof(result[1]) == 'undefined' ? '' : result[1];
      var paramString = typeof(result[2]) == 'undefined' ? '' : result[2];
      var func = typeof(result[3]) == 'undefined' ? '' : result[3];
      var params = paramString.split(';');

      // Parse paramters into integer values; non-integer/empty parameters get -1.
      for(var i = 0; i < params.length; ++i) {
        params[i] = parseInt(params[i]);
        if(isNaN(params[i]))
          params[i] = -1;
      }

      switch(func) {
        case 'd': // VPA (vertical position absolute)
          var r = params[0] > 0 ? params[0] - 1 : 0;
          _setCursorRow(r);
          break;
        case 'm': // SGR (character attributes)
          for(var i = 0; i < params.length; ++i)
            _applySGRAttribute(params[i]);
          break;
        case 'h': // DECSET (set option)
          for(var i = 0; i < params.length; ++i)
            _applyDECSetting(params[i]);
          break;
        case 'l': // DECRST (reset option)
          for(var i = 0; i < params.length; ++i)
            _applyDECReset(params[i]);
          break;
        case 'r': // STBM (set scrolling region)
          jansivt.buffer.scrollTop = params[0] > 0 ? params[0] - 1 : 0;
          jansivt.buffer.scrollBottom = params.length > 1 && params[1] > 0 ? params[1] - 1 : 0;
          jansivt.buffer.useScrollRegion = true;
          break;
        case 'A': // CUU (cursor up n)
          var n = params[0] > 0 ? params[0] : 1;
          _setCursorRow(jansivt.buffer.cursor.y - n);
          break;
        case 'B': // CUD (cursor down n)
          var n = params[0] > 0 ? params[0] : 1;
          _setCursorRow(jansivt.buffer.cursor.y + n);
          break;
        case 'C': // CUF (cursor forward n)
          var n = params[0] > 0 ? params[0] : 1;
          _setCursorCol(jansivt.buffer.cursor.x + n);
          break;
        case 'D': // CUB (cursor backward n)
          var n = params[0] > 0 ? params[0] : 1;
          _setCursorCol(jansivt.buffer.cursor.x - n);
          break;
        case 'G': // CHA (cursor character absolute [column])
          var c = params[0] > 0 ? params[0] - 1 : 0;
          _setCursorCol(c);
          break;
        case 'H': // CUP (set cursor position)
          var y = params[0] > 0 ? params[0] - 1 : 0;
          var x = params.length > 1 && params[1] > 0 ? params[1] - 1 : 0;
          _setCursor(x, y);
          break;
        case 'J': // ED (erase display)
          var top = 0; var count = 0;
          var mode = params[0];
          switch(mode) {
            case 0: // erase below
              top = jansivt.buffer.cursor.y;
              count = jansivt.rows - top;
              break;
            case 1: // erase above
              top = 0;
              count = jansivt.buffer.cursor.y + 1;
              break;
            case 2: // erase all
              top = 0;
              count = jansivt.rows;
              break;
            //RvC: if no params
            default: // erase below
              top = jansivt.buffer.cursor.y;
              count = jansivt.rows - top;
          }
          for(var i = top; i < top + count; ++i)
            jansivt.buffer.lines[i] = [];
          break;
        case 'K': // EL (erase in line)
          var mode = 0;
          if(params.length > 0) mode = params[0];
          switch(mode) {
            case -1: case 0: // erase right
              var line = jansivt.buffer.lines[jansivt.buffer.cursor.y];
              if(typeof(line) != 'undefined')
                jansivt.buffer.lines[jansivt.buffer.cursor.y] = line.slice(0, jansivt.buffer.cursor.x);
              break;
            case 1: // erase left
              var line = jansivt.buffer.lines[jansivt.buffer.cursor.y];
              for(var c = 0; c <= jansivt.buffer.cursor.x; ++c)
                line[c] = {chr:" ", attr:{}};
              break;
            case 2: // erase all
              jansivt.buffer.lines[jansivt.buffer.cursor.y] = [];
              break;
          }
          break;
        case 'L': // IL (insert lines)
          var n = params[0] > 0 ? params[0] : 1;
          while(n--)
            jansivt.buffer.lines.splice(jansivt.buffer.cursor.y, 0, []);
          var scrollBottom = jansivt.buffer.useScrollRegion ? jansivt.buffer.scrollBottom : jansivt.rows-1;
          if(jansivt.buffer.lines.length > jansivt.rows)
            jansivt.buffer.lines.splice(scrollBottom + 1, jansivt.buffer.lines.length - jansivt.rows);
          break;
        case 'M': // DL (delete lines)
          var n = params[0] > 0 ? params[0] : 1;
          jansivt.buffer.lines.splice(jansivt.buffer.cursor.y, n);
          var scrollBottom = jansivt.buffer.useScrollRegion ? jansivt.buffer.scrollBottom : jansivt.rows-1;
          while(n--)
            jansivt.buffer.lines.splice(scrollBottom - n, 0, []);
          break;
        case 'S': // SU (scroll up)
          var n = params[0] > 0 ? params[0] : 1;
          while(n--)
            _shiftLinesUp();
          break;
        case 'T': // SD (scroll down)
          var n = params[0] > 0 ? params[0] : 1;
          while(n--)
            _shiftLinesDown();
          break;
        case '@': // ICH (insert blank characters)
          var n = params[0] > 0 ? params[0] : 1;
          if(jansivt.buffer.lines[jansivt.buffer.cursor.y].length > jansivt.buffer.cursor.x)
            while(n--)
              jansivt.buffer.lines[jansivt.buffer.cursor.y].splice(jansivt.buffer.cursor.x, 0, {chr:" ", attr:{}});
          break;
        case 'P': // DCH (delete characters)
          var n = params[0] > 0 ? params[0] : 1;
          jansivt.buffer.lines[jansivt.buffer.cursor.y].splice(jansivt.buffer.cursor.x, n);
          break;
        case 'c':
          break;
        default:
          // Not implemented. carry on - with some debugging
          bytes = [];
          for(var i = 0; i < match.length; ++i)
            bytes.push(match.charCodeAt(i).toString(16));
          return {length: 1};
      }
      
      return {length: match.length};
    };

    // Apply a character attribute set as specified by the SGR sequence
    var _applySGRAttribute = function(n) {
      switch(n) {
        case -1: case 0:
          jansivt.buffer.attr.fgColor = 7;
          jansivt.buffer.attr.bgColor = 0;
          jansivt.buffer.attr.bold = false;
          jansivt.buffer.attr.underline = false;
          jansivt.buffer.attr.blink = false;
          jansivt.buffer.attr.inverse = false;
          break;
        case 1:
          jansivt.buffer.attr.bold = true;
          break;
        case 4:
          jansivt.buffer.attr.underline = true;
          break;
        case 5:
          jansivt.buffer.attr.blink = true;
          break;
        case 7:
          jansivt.buffer.attr.inverse = true;
          break;
        case 22:
          jansivt.buffer.attr.bold = false;
          break;
        case 24:
          jansivt.buffer.attr.underline = false;
          break;
        case 25:
          jansivt.buffer.attr.blink = false;
          break;
        case 27:
          jansivt.buffer.attr.inverse = false;
          break;
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
          jansivt.buffer.attr.fgColor = n - 30;
          break;
        case 39:
          jansivt.buffer.attr.fgColor = 7;
          break;
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
          jansivt.buffer.attr.bgColor = n - 40;
          break;
        case 49:
          jansivt.buffer.attr.bgColor = 0;
          break;
        default:
      }
    };

    var _applyDECSetting = function(n) {
      switch(n) {
        case 1:
          jansivt.applicationKeyMode = true;
          break;
        case 12:
          break;
        case 25:
          jansivt.showCursor = true;
          break;
        case 47:
        case 1047:
          jansivt.buffer = jansivt.alternateBuffer;
          break;
        case 1048:
          jansivt.buffer.savedCursor.x = jansivt.buffer.cursor.x;
          jansivt.buffer.savedCursor.y = jansivt.buffer.cursor.y;
          break;
        case 1049:
          jansivt.buffer.savedCursor.x = jansivt.buffer.cursor.x;
          jansivt.buffer.savedCursor.y = jansivt.buffer.cursor.y;
          for(var i = 0; i < jansivt.alternateBuffer.lines.length; ++i)
            jansivt.alternateBuffer.lines[i] = [];
          jansivt.alternateBuffer.useScrollRegion = false;
          jansivt.alternateBuffer.cursor = {x:0, y:0};
          jansivt.alternateBuffer.attr.fgColor = 7;
          jansivt.alternateBuffer.attr.bgColor = 0;
          jansivt.buffer = jansivt.alternateBuffer;
          break;
        default:
      }
    };

    var _applyDECReset = function(n) {
      switch(n) {
        case 1:
          jansivt.applicationKeyMode = false;
          jansivt.buffer.useScrollRegion = false;
          jansivt.buffer.scrollBottom = 0;
          jansivt.buffer.scrollTop = 0;
          break;
        case 12:
          break;
        case 25:
          jansivt.showCursor = false;
          break;
        case 47:
        case 1047:
          jansivt.buffer = jansivt.defaultBuffer;
          break;
        case 1048:
          jansivt.buffer.cursor.x = jansivt.buffer.savedCursor.x;
          jansivt.buffer.cursor.y = jansivt.buffer.savedCursor.y;
          break;
        case 1049:
          jansivt.buffer = jansivt.defaultBuffer;
          jansivt.buffer.cursor.x = jansivt.buffer.savedCursor.x;
          jansivt.buffer.cursor.y = jansivt.buffer.savedCursor.y;
          break;
        default:
      }
    };

    var _newBuffer = function() {
      var buffer = {
        cursor: {x:0,y:0},  // current cursor position in the virtual buffer
        lines: [],      // visible line buffer
        attr: {       // character attributes used for newly written characters
          fgColor: 7,
          bgColor: 0,
          bold: false,
          underline: false,
          blink: false,
          inverse: false,
          'font-weight': 'normal',
        },
        savedCursor: {x:0,y:0}, // saved cursor state from DECSC
        useScrollRegion: false, // default to full window scrolling
        scrollTop: 0,     // top row of the defined scroll region, if any
        scrollBottom: 0,    // bottom row of the defined scroll region, if any
        scrollBuffer: []    // lines shifted out of the visible buffer
      };
      for(var i = 0; i < jansivt.rows; ++i)
        buffer.lines.push([]);
      return buffer;
    };

    var _resizeBuffer = function(buffer, w, h) {

        // Offset if resizing to smaller size.
      var offset = 0;
      if ( (buffer.lines.length > h) && (buffer.cursor.y >= h) ) {
        var cur_y = buffer.cursor.y +1;
        offset = buffer.cursor.y - h + 1;
        buffer.cursor.y = h - 1;
      }

      var lines = buffer.lines;
      buffer.lines = [];
      for(var j = 0; j < h; ++j) {
        var line = [];
        // Add offset
        var oldLine = ((j+offset) in lines) ? lines[j+offset] : [];
        buffer.lines.push(line);
        for(var i = 0; i < w; ++i) {
          if(i in oldLine)
            line.push(oldLine[i]);
        }
      }

    };


    var defaults = {

      cols: 80,
      rows: 25,
      scrollSize: 100,
      fontSize: 16,
      vtColors: [],
      colorScheme: 'gnomeTango',
      title: "jAnsiVT",
      getKeyboard: false,
      ignoreBold: false,
      changeWidthOnScroll: false,
      onChangeTitle: function(title){},
      onKeyboardInput: function(k){},

    }

    jansivt.settings = {}

    // Init function launched on jAnsiVT created.
    var _init = function(options) {

      jansivt.settings = $.extend({}, defaults, options);

      jansivt.rows = jansivt.settings.rows;
      jansivt.cols = jansivt.settings.cols;

      jansivt.scrollBufferLines = jansivt.settings.scrollSize;

      // Override vtColors or get from colorSchemes.
      jansivt.settings.vtColors = (jansivt.settings.vtColors.length) ? jansivt.settings.vtColors : colorSchemes[jansivt.settings.colorScheme];

      jansivt.title = jansivt.settings.title;

      jansivt.onChangeTitle = jansivt.settings.onChangeTitle;
      jansivt.onKeyboardInput = jansivt.settings.onKeyboardInput;

      // Let's start
      jansivt.display = $("<div/>").addClass("jansivt-display");
      jansivt.scroll = $("<div/>").addClass("jansivt-scroll");

      jansivt.container.addClass('jansivt-wrapper').text('');

      jansivt.container.append(jansivt.scroll);
      jansivt.container.append(jansivt.display);

      // Populate screen
      for (i = 0; i < jansivt.rows; i++) {
        jansivt.screen.push([]);
        var row = $('<div/>').addClass('term-row').addClass('term-row-'+i);
        for (j = 0; j < jansivt.cols; j++) {
            jansivt.screen[i].push($("<pre/>").css("background", jansivt.settings.vtColors[0]).css("color", jansivt.settings.vtColors[7]).text(" ").addClass('term-col').addClass('term-col-'+j).appendTo(row));
        }
        jansivt.display.append(row);
      }

      jansivt.defaultBuffer = _newBuffer();
      jansivt.alternateBuffer = _newBuffer();

      jansivt.buffer = jansivt.defaultBuffer;

      // Add some styling.
      var max_height = jansivt.rows*(jansivt.settings.fontSize+2);
      var max_width = jansivt.cols*(jansivt.settings.fontSize/2);
      jansivt.container.css('background-color', jansivt.settings.vtColors[0]).css('max-height',max_height+'px').css('max-width',max_width+'px').css('height',max_height+'px').css('width',max_width+'px');
      jansivt.display.css('background-color',jansivt.settings.vtColors[0]);
      jansivt.scroll.css('background-color',jansivt.settings.vtColors[0]);

      // This will override default stylesheet properties
      document.styleSheets[0].insertRule(".jansivt-display pre, .jansivt-scroll pre { font-size:"+jansivt.settings.fontSize+"px;height:"+(jansivt.settings.fontSize+2)+"px;width:"+(jansivt.settings.fontSize/2)+"px }", 0);
      document.styleSheets[0].insertRule(".jansivt-display .term-row, .jansivt-scroll .term-row { max-height:"+(jansivt.settings.fontSize+2)+"px }", 0);
      document.styleSheets[0].insertRule(".jansivt-display, .jansivt-scroll { line-height:"+(jansivt.settings.fontSize+2)+"px }", 0);

      // Intercept keyboard
      if (jansivt.settings.getKeyboard) {
        $(document).on('keydown.jansivt',function(e){
          return jansivt.keyInput(e);
        });
        $(document).on('keypress.jansivt',function(e){
          return jansivt.asciiInput(e);
        });
      }

    };

    // Init
    _init(options);

  };

/*
 * Add some functions to jQuery prototype to make life easier.
 * This is just to allow us to call $(terminalSelector).someJAnsiVTFunction() 
 * instead of $(terminalSelector).data('jAnsiVT').someJAnsiVTFunction()
 */

  // jQuery function that returns jAnsiVT settings
  //  @return:
  //    - settings Array
  $.fn.getSettings = function() {

        // if plugin has not already been attached to the element
        if (undefined !== $(this).data('jAnsiVT')) {
          return $(this).data('jAnsiVT').settings;
        }

  };

  // jQuery function that calls jansivt.updateDisplay on element
  //  @return:
  //    - jansivt.updateDisplay response
  $.fn.updateDisplay = function() {

        // if plugin has not already been attached to the element
        if (undefined !== $(this).data('jAnsiVT')) {
          return $(this).data('jAnsiVT').updateDisplay();
        }

  };

  // jQuery function that calls jansivt.write on element
  //  @params:
  //    - msg: String to be written into terminal
  //  @return:
  //    - jansivt.write response
  $.fn.write = function(msg) {

        // if plugin has not already been attached to the element
        if (undefined !== $(this).data('jAnsiVT')) {
          return $(this).data('jAnsiVT').write(msg);
        }

  };

  // jQuery function that calls jansivt.changeFontSize on element
  //  @params:
  //    - fontSize: Integer font-size
  //  @return:
  //    - jansivt.changeFontSize response
  $.fn.changeFontSize = function(fontSize) {

        // if plugin has not already been attached to the element
        if (undefined !== $(this).data('jAnsiVT')) {
          return $(this).data('jAnsiVT').changeFontSize(fontSize);
        }

  };

  // jQuery function that calls jansivt.resize on element
  //  @params:
  //    - width: Integer terminal columns
  //    - height: Integer terminal rows
  //  @return:
  //    - jansivt.resize response
  $.fn.resize = function(width,height) {

        // if plugin has not already been attached to the element
        if (undefined !== $(this).data('jAnsiVT')) {
          return $(this).data('jAnsiVT').resize(width,height);
        }

  };

  // jQuery function that returns jansivt.display
  //  @return:
  //    - jansivt.display jQuery element
  $.fn.getDisplay = function() {

        // if plugin has not already been attached to the element
        if (undefined !== $(this).data('jAnsiVT')) {
          return $(this).data('jAnsiVT').display;
        }

  };

  // jQuery function that returns jansivt.scroll
  //  @return:
  //    - jansivt.scroll jQuery element
  $.fn.getScroll = function() {

        // if plugin has not already been attached to the element
        if (undefined !== $(this).data('jAnsiVT')) {
          return $(this).data('jAnsiVT').scroll;
        }

  };

  // jQuery constructor
  $.fn.jAnsiVT = function(options) {

       // if plugin has not already been attached to the element
      if (undefined == $(this).data('jAnsiVT')) {

        // create a new instance of the plugin
        // pass the DOM element and the user-provided options as arguments
        var jansivt = new $.jAnsiVT(this, options);

        // In the jQuery version of the element
        // store a reference to the plugin object
        $(this).data('jAnsiVT', jansivt);

      }

      return $(this);
  };

})(jQuery);
