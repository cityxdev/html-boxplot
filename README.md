# html-boxplot
A boxplot implemented with javascript and rendered with HTML and CSS

This library is a standalone javascript file that requires jQuery and draws a simple boxplot chart inside a given element.
The chart is rendered using only html elements and css styles for those.

Use it like:

let bp = new org.cityxdev.boxplot.BoxPlot({
    values:{//mandatory
        min: descStats.min,//optional
        p25: descStats.p25,//mandatory Q1
        p50: descStats.p50,//mandatory Q2 - median
        p75: descStats.p75,//mandatory Q3
        max: descStats.max,//optional,
        decimalPlaces:2//optional
    },
    $target:$('td.dispersion.'+repCampaign,trDispersion), //mandatory jQuery element
    style:{ //optional
        height: '15px', //css
        width: '100%',  //css
        borderColor: '#4E74AB', //css
        borderWidthPx:2,

        medColor: '#FFC767', //css
        medWidthPx: 2,

        boxBorderColor: '#7E9AC4', //css
        boxWidthPx: 2,
        boxBackgroundColor: 'white', //css

        legendLabelColor:'#7E9AC4', //css
        legendValueColor:'#495057', //css
        legendBackgroundColor:'white', //css
        legendBorderColor:'#7E9AC4', //css
        legendBorderWidthPx:2
    },
    translation:{ //for legend - optional
        min:'min',
        q1:'Q1',
        med:'med',
        q3:'Q3',
        max:'max',
        iqr:'IIQ'
    }
});
