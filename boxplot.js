if(typeof org === 'undefined')
    org={cityxdev:{}};

if(!org.cityxdev) {
    org.cityxdev={boxplot:{}};
}
if(!org.cityxdev.boxplot) {
    org.cityxdev.boxplot = {};
}

org.cityxdev.boxplot.BoxPlot = function(options) {
    let opts = options;
    const $target=opts.$target;

    const _isMobile=function() {
        var isMobile = false;
        // device detection
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
            isMobile = true;
        }
        return isMobile;
    };

    let data,p25,p50,p75,median,min,max,totalDelta,IQR,plotMin,plotMax,plotDelta,boxMin,boxMax,boxDelta;
    let decimalPlaces;

    let height,width,borderWidthPx,borderColor,boxWidthPx,boxBorderColor,boxBackgroundColor,medColor,medWidthPx;
    let legendLabelColor,legendValueColor,legendBackgroundColor,legendBorderColor,legendBorderWidthPx;

    let error;

    let minTranslation,q1Translation,medTranslation,q3Translation,maxTranslation,iqrTranslation;

    const _loadTranslation = function() {
        minTranslation = opts.translation&&opts.translation.min!==undefined?opts.translation.min:'min';
        q1Translation = opts.translation&&opts.translation.q1!==undefined?opts.translation.q1:'q1';
        medTranslation = opts.translation&&opts.translation.med!==undefined?opts.translation.med:'med';
        q3Translation = opts.translation&&opts.translation.q3!==undefined?opts.translation.q3:'q3';
        maxTranslation = opts.translation&&opts.translation.max!==undefined?opts.translation.max:'max';
        iqrTranslation = opts.translation&&opts.translation.iqr!==undefined?opts.translation.iqr:'IQR';
    };

    const _loadValues = function() {
        decimalPlaces = opts.values.decimalPlaces !== undefined ? opts.values.decimalPlaces : 2;
        data = opts.values.data;

        if(data){
            if(data.length<=1){
                error=true;
                console.log('ERROR: wrong input data.');
                return;
            }

            data.sort(function (a,b) {
                return a-b;
            });

            p25 = _quantile(data,25);
            p50 = _quantile(data,50);
            p75 = _quantile(data,75);

            min = data[0];
            max = data[data.length-1];
        } else {
            p25 = opts.values.p25;
            p50 = opts.values.p50;
            p75 = opts.values.p75;

            min = opts.values.min;
            max = opts.values.max;

            if(p25===null||p25===undefined||p50===null||p50===undefined||p75===null||p75===undefined||p25>p50||p50>p75){
                error=true;
                console.log('ERROR: wrong input data.');
                return;
            }

            if(min!==null&&min!==undefined && min>p25){
                error=true;
                console.log('ERROR: wrong input data.');
                return;
            }

            if(max!==null&&max!==undefined && max<p75){
                error=true;
                console.log('ERROR: wrong input data.');
                return;
            }
        }

        median = p50;

        boxMin = p25;
        boxMax = p75;
        boxDelta = boxMax - boxMin;

        IQR = p75 - p25;
        plotMin = Math.max(p25 - IQR * 1.5, min !== undefined ? min : Number.MIN_VALUE);
        plotMax = Math.min(p75 + IQR * 1.5, max !== undefined ? max : Number.MAX_VALUE);
        plotDelta = plotMax - plotMin;

        min = min !== undefined ? min : plotMin;
        max = max !== undefined ? max : plotMax;
        totalDelta = max - min;
    };

    const _quantile = function(sortedArray, percentile) {
        let index = percentile/100.0 * (sortedArray.length-1);
        if (Math.floor(index) === index) {
            return sortedArray[index];
        } else {
            let i = Math.floor(index);
            let fraction = index - i;
            return sortedArray[i] + (sortedArray[i+1] - sortedArray[i]) * fraction;
        }
    };

    const _loadStyles = function() {
        height = opts.style && opts.style.height !== undefined ? opts.style.height : '20px';
        width = opts.style && opts.style.width !== undefined ? opts.style.width : '100%';

        borderWidthPx = opts.style && opts.style.borderWidthPx !== undefined ? opts.style.borderWidthPx : 1;
        borderColor = opts.style && opts.style.borderColor !== undefined ? opts.style.borderColor : 'black';

        boxWidthPx = opts.style && opts.style.boxWidthPx !== undefined ? opts.style.boxWidthPx : 1;
        boxBorderColor = opts.style && opts.style.boxBorderColor !== undefined ? opts.style.boxBorderColor : 'blue';
        boxBackgroundColor = opts.style && opts.style.boxBackgroundColor !== undefined ? opts.style.boxBackgroundColor : 'white';

        medColor = opts.style && opts.style.medColor !== undefined ? opts.style.medColor : 'green';
        medWidthPx = opts.style && opts.style.medBorderWidth !== undefined ? opts.style.medBorderWidth : 2;

        legendLabelColor = opts.style && opts.style.legendLabelColor !== undefined ? opts.style.legendLabelColor : 'black';
        legendValueColor = opts.style && opts.style.legendValueColor !== undefined ? opts.style.legendValueColor : 'black';
        legendBackgroundColor = opts.style && opts.style.legendBackgroundColor !== undefined ? opts.style.legendBackgroundColor : 'white';
        legendBorderColor = opts.style && opts.style.legendBorderColor !== undefined ? opts.style.legendBorderColor : 'black';
        legendBorderWidthPx = opts.style && opts.style.legendBorderWidthPx !== undefined ? opts.style.legendBorderWidthPx : 1;
    };

    let boxPlotElems = undefined;

    const _draw = function() {
        boxPlotElems = $(
            '<div class="box-plot-container">' +
            '   <div class="box-plot">' +
            '       <div class="hor-line"></div>' +
            '       <div class="min"></div>' +
            '       <div class="max"></div>' +
            '       <div class="min-max"></div>' +
            '       <div class="box"></div>' +
            '       <div class="med"></div>' +
            '   </div>' +
            '</div>'
        );

        if(_isMobile()) {
            $('body').click(function (event) {
                if ($(event.target).parents('.box-plot-container').length === 0) {
                    hideLegend();
                }
            });
            boxPlotElems.click(function () {
                showLegend();
            });
        }else {
            boxPlotElems.on({
                mouseenter: showLegend,
                mouseleave: hideLegend
            });
        }

        function hideLegend() {
            $('div.box-plot-legend').remove();
        }
        function showLegend() {
            const legendElem = $('<div class="box-plot-legend" style="display: none;"></div>');
            legendElem.css('position','absolute');
            legendElem.css('top',boxPlotElems.offset().top+'px');
            legendElem.css('left',(boxPlotElems.offset().left+boxPlotElems.width()+2)+'px');
            legendElem.css('z-index',10000);
            legendElem.css('padding','5px');

            legendElem.css('background-color',legendBackgroundColor);
            legendElem.css('border',legendBorderWidthPx+'px solid '+legendBorderColor);
            legendElem.css('border-radius','4px');

            legendElem.append($(
                '<table>' +
                '<tr><td><label>'+minTranslation+'</label></td><td class="min-val"></td></tr>' +
                '<tr><td><label>'+q1Translation+'</label></td><td class="q1-val"></td></tr>' +
                '<tr><td><label>'+medTranslation+'</label></td><td class="med-val"></td></tr>' +
                '<tr><td><label>'+q3Translation+'</label></td><td class="q3-val"></td></tr>' +
                '<tr><td><label>'+maxTranslation+'</label></td><td class="max-val"></td></tr>' +
                '<tr><td><label>'+iqrTranslation+'</label></td><td class="iqr-val"></td></tr>' +
                '</table>'
            ));
            $('td.min-val',legendElem).html(min.toFixed(decimalPlaces));
            $('td.q1-val',legendElem).html(p25.toFixed(decimalPlaces));
            $('td.med-val',legendElem).html(median.toFixed(decimalPlaces));
            $('td.q3-val',legendElem).html(p75.toFixed(decimalPlaces));
            $('td.max-val',legendElem).html(max.toFixed(decimalPlaces));
            $('td.iqr-val',legendElem).html(IQR.toFixed(decimalPlaces));

            $('table td',legendElem).css('vertical-align','middle');
            $('table td label',legendElem).css('margin','0').css('color',legendLabelColor);

            $('body').append(legendElem);
            legendElem.show();
        }

    };

    const _applyStyles = function() {
        $(boxPlotElems).css('height',height);
        $(boxPlotElems).css('width',width);

        $('div.box-plot', boxPlotElems).css('width', '100%');
        $('div.box-plot', boxPlotElems).css('height', '100%');
        $('div.box-plot', boxPlotElems).css('position', 'relative');

        $('div.min,div.max', boxPlotElems).css('position', 'absolute');
        $('div.min,div.max', boxPlotElems).css('width', (borderWidthPx/2)+'px');
        $('div.min,div.max', boxPlotElems).css('height',(borderWidthPx/2)+'px');
        $('div.min,div.max', boxPlotElems).css('top','calc(50% - '+(borderWidthPx/2)+'px)');
        $('div.min,div.max', boxPlotElems).css('border-top', borderWidthPx + 'px solid ' + borderColor);
        $('div.min,div.max', boxPlotElems).css('border-left', borderWidthPx + 'px solid ' + borderColor);
        $('div.max', boxPlotElems).css('left', 'calc(100% - '+(borderWidthPx)+'px)');



        $('div.min-max', boxPlotElems).css('position', 'absolute');
        $('div.min-max', boxPlotElems).css('height', '100%');
        $('div.min-max', boxPlotElems).css('border-left', borderWidthPx + 'px solid ' + borderColor);
        $('div.min-max', boxPlotElems).css('border-right', borderWidthPx + 'px solid ' + borderColor);

        $('div.med', boxPlotElems).css('position', 'absolute');
        $('div.med', boxPlotElems).css('border-left', medWidthPx + 'px solid ' + medColor);
        $('div.med', boxPlotElems).css('height', 'calc(80% - ' + (boxWidthPx * 2) + 'px)');
        $('div.med', boxPlotElems).css('top', 'calc(10% + '+boxWidthPx + 'px)');

        $('div.box', boxPlotElems).css('position', 'absolute');
        $('div.box', boxPlotElems).css('height', '80%');
        $('div.box', boxPlotElems).css('top', '10%');
        $('div.box', boxPlotElems).css('border', boxWidthPx + 'px solid ' + boxBorderColor);
        $('div.box', boxPlotElems).css('background-color', boxBackgroundColor);
        $('div.box', boxPlotElems).css('border-radius', '2px');

        $('div.hor-line', boxPlotElems).css('position', 'absolute');
        $('div.hor-line', boxPlotElems).css('top', 'calc(50% - ' + (borderWidthPx / 2) + 'px)');
        $('div.hor-line', boxPlotElems).css('height', borderWidthPx + 'px');
        $('div.hor-line', boxPlotElems).css('border-top', +borderWidthPx + 'px solid ' + borderColor);
    };

    const _applyValues = function() {
        let localPlotMin = plotMin;
        let localPlotMax = plotMax;
        let localPlotDelta = plotDelta;

        if(localPlotMin<min){
            error=true;
            console.log('ERROR: (p25 - IQR * 1.5) < min ');
        }

        if(localPlotMin>boxMin){
            error=true;
            console.log('ERROR: (p25 - IQR * 1.5) > p25 ');
        }

        if(localPlotMax>max){
            error=true;
            console.log('ERROR: (p75 + IQR * 1.5) > max ');
        }

        if(localPlotMax<boxMax){
            error=true;
            console.log('ERROR: (p75 + IQR * 1.5) < p75 ')
        }

        if(error){
            localPlotMax=max;
            localPlotMin=min;
            localPlotDelta=localPlotMax-localPlotMin;
            $('div.min', boxPlotElems).hide();
            $('div.max', boxPlotElems).hide();
            $('div.box', boxPlotElems).hide();
            $('div.min-max', boxPlotElems).css('background-color','rgba(255,0,0,0.1)');
        }


        const horLineWidth = (localPlotDelta) / totalDelta * 100;
        const horLineLeft = (localPlotMin-min) / totalDelta * 100;
        $('div.min-max', boxPlotElems).css('width', horLineWidth+'%');
        $('div.min-max', boxPlotElems).css('left', horLineLeft+'%');
        $('div.hor-line', boxPlotElems).css('width', horLineWidth+'%');
        $('div.hor-line', boxPlotElems).css('left', horLineLeft+'%');

        const medLeft = (median - min) / totalDelta * 100;
        $('div.med', boxPlotElems).css('left', 'calc(' + medLeft + '% - ' + (medWidthPx / 2) + 'px)');

        $('div.box', boxPlotElems).css('left', ((boxMin - min) / totalDelta * 100) + '%');
        $('div.box', boxPlotElems).css('width', (boxDelta / totalDelta * 100) + '%');
    };

    this.redraw = function (options) {
        error=false;
        if(options)
            opts=options;
        _loadValues();
        _loadStyles();
        _loadTranslation();
        $('div.box-plot-container',$target).remove();
        _draw();
        _applyStyles();
        _applyValues();
        $target.append(boxPlotElems);
    };

    this.redraw();

};
