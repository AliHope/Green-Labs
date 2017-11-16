/**
 * Created by tingyuan on 15/12/29.
 */
;
(function ($) {
    if ($ === undefined) {
        return;
    }
    var defaultConfig = {
        num: 3, //要显示的数量，应该是个奇数
        maxWidth: 250, //代表中央图片的宽度
        maxHeight: 150, //中央图片的高度
        autoPlay: true, //是否自动滚动播放
        showTime: 1000, //autoPlay为true时这个属性才有用
        animationTime: 300, //
        scale: 0.8,
        distance: 50
    };

    var vectorClick;


    function getzIndexValue(num, direction) {
        var zIndexs = [];
        for (var i = 0; i < num; i++) {
            if (i <= (num - 1) / 2) {
                zIndexs.push(i);
            } else {
                zIndexs.push((num - 1) / 2 - i);
            }
        }
        if (direction === 'left') {
            zIndexs.reverse();
            return zIndexs;
        }
        if (direction === 'right') {
            return zIndexs;
        }

    }

    function scroll($container, direction) {
        if ($container.data('isanimating')) {
            return;
        }
        var config = $container.data('config');
        var halfShowNum = (config.num - 1) / 2;
        var scales, i, newIndex;
        var totalNum = $container.data('totalNum');
        var targetCss;
        var firstIndexBeforeScroll, lastIndexBeforeScroll;
        if (direction === 'left') {
            vectorClick = 'left';
            window.vectorClickW = vectorClick;
            newIndex = ($container.data('index') - 1 + totalNum) % totalNum;
        } else if (direction === 'right') {
            vectorClick = 'right';
            window.vectorClickW = vectorClick;
            newIndex = ($container.data('index') + 1) % $container.data('totalNum');
        } else {
            return;
        }
        // $container.find('ul li').stop(true, true);
        var tempIndexsInfo = getShowIndexs($container);
        firstIndexBeforeScroll = tempIndexsInfo.indexs[0];
        lastIndexBeforeScroll = tempIndexsInfo.indexs[config.num - 1];
        $container.data('index', newIndex);
        var showIndexsInfo = getShowIndexs($container);
        var zIndexs = getzIndexValue(config.num, direction);
        if (totalNum === config.num) {
            animationTimeForEdge = 0
        } else if (totalNum - config.num === 2) {
            animationTimeForEdge = config.animationTime / 2;
        } else {
            animationTimeForEdge = config.animationTime;
        }

        /*
         showIndexsInfo = {
         indexs: [5, 6, 0, 1, 2]
         hashIndexs: {
         '5': 0,
         '6': 1,
         '0': 2,
         '1': 3,
         '2': 4
         }
         }
         */
        $container.find('ul li').each(function (index, element) {

            i = showIndexsInfo.hashIndexs[index];

            if (i !== undefined) {
                scales = Math.pow(config.scale, Math.abs(i - halfShowNum));
                $container.data('isanimating', true);
                $(element).css({
                    display: 'block',
                    'z-index': zIndexs[i] + 9999}).animate({
                    width: scales * config.maxWidth,
                    height: scales * config.maxHeight,
                    left: i * config.distance + (1 - scales) * config.maxWidth * Number(i > halfShowNum),
                    top: (1 - scales) * config.maxHeight / 2
                }, config.animationTime, function () {
                    $container.data('isanimating', false);
                });

            } else {
                scales = Math.pow(config.scale, halfShowNum);
                //if(direction === 'right' && index === firstIndexBeforeScroll){
                //    console.log('right' + index);
                //} else if(direction === 'left' && index === lastIndexBeforeScroll) {
                //    console.log('left' + index);
                //}

                targetCss = {
                    display: 'none',
                    left: halfShowNum * config.distance + (1 - scales) * config.maxWidth / 2,
                    top: 0
                };
                if (direction === 'left' && index === lastIndexBeforeScroll) {

                    $(element).css('z-index', -1).animate({
                        left: "-=" + config.distance + "px"
                    }, config.animationTime, function () {
                        $(element).css(targetCss);
                    });
                } else if (direction === 'right' && index === firstIndexBeforeScroll) {

                    $(element).css('z-index', -1).animate({
                        left: "+=" + config.distance + "px"
                    }, config.animationTime, function () {
                        $(element).css(targetCss);
                    });
                } else {
                    $(element).css({
                        display: 'none',
                        width: scales * config.maxWidth,
                        height: scales * config.maxHeight,
                        left: halfShowNum * config.distance + (1 - scales) * config.maxWidth / 2,
                        top: 0
                    });
                }
            }

        });
    }

    function getConfig(newConfig) {
        var config = null;
        if (typeof newConfig === 'object' && newConfig !== null) {
            config = {};
            for (var prop in defaultConfig) {
                if (defaultConfig.hasOwnProperty(prop)) {
                    config[prop] = defaultConfig[prop];
                }
            }
            for (prop in newConfig) {
                if (newConfig.hasOwnProperty(prop) && config.hasOwnProperty(prop)) {
                    config[prop] = newConfig[prop];
                }
            }
        }
        return config;
    }

    function getShowIndexs($container) {
        var showIndexs = [];
        var temp;
        var halfShowNum = ($container.data('config').num - 1) / 2;
        var currentIndex = $container.data('index') || 0;
        var totalNum = $container.data('totalNum') || 0;
        for (var i = -halfShowNum; i <= halfShowNum; i++) {
            temp = currentIndex + i;
            showIndexs.push((temp < 0 ? (temp + totalNum) : temp) % totalNum);
        }
        var hashIndexs = {};
        for (i = 0; i < showIndexs.length; i++) {
            hashIndexs[showIndexs[i]] = i;
        }
        return {
            indexs: showIndexs,
            hashIndexs: hashIndexs
        };
    }

    function initStyle($container) {
        var showIndexsInfo = getShowIndexs($container);

        var viewport = window.innerWidth;
        var top = 0;
        var left = 0;
        var right = 0;

        if(viewport < 768){
            top = '135px';
            left = '1%';
            right = '1%';
        } else {
            top = '50%';
            left = -40;
            right = -40;
        }

        var zIndex = 9999;
        var scales;
        var config = $container.data('config');
        var halfShowNum = (config.num - 1) / 2;
        var listWidth = halfShowNum * config.distance * 2 + config.maxWidth;
        var containerWidth = $container.width();
        var containerHeight = $container.height();
        if (containerWidth < listWidth) {
            $container.width(listWidth);
        }
        if (containerHeight < config.maxHeight) {
            $container.height(config.maxHeight);
        }
        $container.find('ul li img').css({
            width: "100%",
            height: "100%"
        });
        $container.find('ul').css({
            position: 'relative',
            width: listWidth,
            height: config.maxHeight,
            'list-style': 'none',
            padding: 0,
            margin: 0,
            marginLeft: '50%',
            left: -listWidth / 2,
            top: '40px'
        });

        $container.find('.left').css({
            position: 'absolute',
            height: '25px',
            left: left,
            top: top,
            cursor: 'pointer',
            'z-index': 9999 + $container.data('totalNum') + 1
        });

        $container.find('.right').css({
            position: 'absolute',
            height: '25px',
            right: right,
            top: top,
            cursor: 'pointer',
            'z-index': 9999 + $container.data('totalNum') + 1
        });

        $container.find('ul li').each(function (index, element) {
            var i = showIndexsInfo.hashIndexs[index];
            if (i !== undefined) {
                scales = Math.pow(config.scale, Math.abs(i - halfShowNum));
                zIndex = 9999 + (i > halfShowNum ? (config.num - 1 - i) : i);
                $(element).css({
                    display: 'block',
                    position: 'absolute',
                    'z-index': zIndex,
                    overflow: 'hidden',
                    width: scales * config.maxWidth,
                    height: scales * config.maxHeight,
                    left: i * config.distance + (1 - scales) * config.maxWidth * Number(i > halfShowNum),
                    top: (1 - scales) * config.maxHeight / 2
                });
            } else {
                scales = Math.pow(config.scale, halfShowNum);
                $(element).css({
                    display: 'none',
                    position: 'absolute',
                    overflow: 'hidden',
                    width: scales * config.maxWidth,
                    height: scales * config.maxHeight,
                    left: halfShowNum * config.distance + (1 - scales) * config.maxWidth / 2,
                    top: 0
                });
            }

        });
    }


    $.fn.carousel = function (param) {
        var config;
        var totalNum;
        var $target;
        $(this).each(function(index, target) {
            $target = $(target);
            if (typeof param === 'object' && param !== null) {
                config = getConfig(param);
                totalNum = $target.find('ul li').length;
                if (totalNum <= 0 || totalNum % 2 === 0) {
                    return;
                }
                if (config.num <= 0 || config.num > totalNum) {
                    config.num = totalNum;
                }
                $target.data('config', config);
                $target.data('index', 0);
                $target.data('totalNum', totalNum);
                initStyle($target);

                $target.find('.left').off('click').on('click', (function($target) {
                    return function() {
                        scroll($target, 'left');
                    }
                })($target));
                $target.find('.right').off('click').on('click',(function($target) {
                    return function() {
                        scroll($target, 'right');
                    }
                })($target));

                (function($target) {
                    var autoPlay;
                    clearInterval($target.data('auto'));
                    if($target.data('config').autoPlay) {
                        autoPlay = setInterval(function() {
                            scroll($target, 'right');
                        }, $target.data('config').showTime);
                        $target.data('auto', autoPlay);
                        $target.find('ul').off('mouseenter').on('mouseenter', function() {
                            clearInterval($target.data('auto'));
                        }).off('mouseleave').on('mouseleave', function() {
                            autoPlay = setInterval(function() {
                                scroll($target, 'right');
                            }, $target.data('config').showTime);
                            $target.data('auto', autoPlay);
                        });
                    } else {
                        $target.find('ul').off('mouseenter').off('mouseleave');
                    }
                })($target);
            }

        });

    };

})(jQuery);



//*********************************************************************************************************************

var Text1 = 'О соляной комнате как способе лечения болезней органов дыхания я впервые узнала, когда поехала отдыхать ' +
    'в санаторий. К услугам отдыхающих была предоставлена такая услуга. Я посетила десять сеансов по 30 минут каждый. ' +
    'И вспоминаю это время с удовольствием. Процедура очень приятная, не требует приложения каких-либо усилий. А ' +
    'главное она полезная для системы органов дыхания.';
var Text2 = 'Прекрасный расслабляющий способ ' +
    'для лечения и профилактики дыхательных путей, улучшает работу сердечно сосудистой и нервной систем, ускоряется процесс ' +
    'восстановления поврежденных тканей. \n' +
    'Происходит процесс следующим образом.' +
    'В назначенное время собирается в кабинете несколько пациентов в соленной комнате. Внутри расставлены удобные кресла. ' +
    'Стены в ней отдаленны соленными глыбами. Пациенты располагаются в удобных креслах примерно час на час. В соленной ' +
    'комнате приглушают свет, включают успокаивающую музыку. Большинство засыпают.';
var Text3 = 'На третий день после посещения галокамеры стал храпеть значительно меньше, только изредка похрапывать и ' +
    'через 10 дней храп пропал совсем. Но самое главное бронхитом и что хуже пневмонией больше не болел (хотя до этого ' +
    'каждый год бронхит или пневмония).';
var Text4 = 'Можно прийти на время, заранее оговоренное администратором. Просто нужно сесть и расслабиться. ' +
    'Вокруг все выложено солью: стены и пол. Играет приятная расслабляющая музыка, я слышала пение птиц и шум прибоя. ' +
    'Очень помогают расслабится подобные мелодии. Некоторые люди прямо засыпали под такую музыку, приходилось их будить. ' +
    'После окончания сеанса, правда, становится легче дышать. Мне по крайней мере. Я с удовольствием все сеансы посетила. ' +
    'В следующий раз, когда мне представится возможность поехать в санаторий, я обязательно запишусь на эту процедуру';
var Text5 = 'Пульмонолог порекомендовала соляные комнаты.\n' +
    'После первого курса (делали весной)особых изменений не произошло. Разве что болеть стали реже. ' +
    'Повторили курс осенью. Могу сказать, глядя на своего ребенка, что эффект есть. ' +
    'Постоянное покашливание практически ушло. Про бронхиты практически забыли. Конечно, ' +
    'ОРЗ и вирусные инфекции все равно присутствуют в нашей жизни, но болеть стали значительно реже. ' +
    'Раньше нас очень беспокоила заложенность носа, нам ставили аденоидит. После нескольких курсов ' +
    '(а мы их стараемся делать дважды в год - осенью и весной)проблема ушла. Ребенок ходил с удовольствием. ';

var Name1 = 'Анна Ленская, 31 год';
var Name2 = 'Вавинский Вадим, 32 года';
var Name3 = 'Михненко Николай, 37 лет';
var Name4 = 'Катя Литвинова, 27 лет';
var Name5 = 'Креонова Людмила, 41 год';

var container = document.getElementById('containerSlider');

function preparationSlider() {
    container.querySelectorAll('li')[0].style.opacity = 1;
    document.getElementById('dot1').classList.add('activeDot')
};

preparationSlider();

var a1 =true;
var a2 =true;
var a3 =true;
var a4 =true;
var a5 =true;

container.addEventListener('click', function () {
    container.querySelectorAll('li').forEach( function (element) {
        var parentElText = document.getElementById('containerText');
        var parentElName = document.getElementById('containerName');
        if(element.style.zIndex == 10000) {
            element.style.opacity = 1;
            switch(element.id) {
                case 'personSlide1':
                    parentElText.innerText = '';
                    parentElName.innerText = '';
                    var text = document.createElement('p');
                    var name = document.createElement('p');
                    text.innerText = Text1;
                    name.innerText = Name1;
                    parentElText.appendChild(text);
                    parentElName.appendChild(name);

                    if(a1) {
                        if (vectorClickW === 'right') {
                            text.classList.add('rightToLeftAnimate');
                            name.classList.add('rightToLeftAnimate');
                        }
                        if (vectorClickW === 'left') {
                            text.classList.add('leftToRightAnimate');
                            name.classList.add('leftToRightAnimate');
                        }
                        a1 = false;
                        a2 = true;
                        a5 = true;
                    }

                    document.getElementById('dot1').classList.add('activeDot');
                    document.getElementById('dot2').classList.remove('activeDot');
                    document.getElementById('dot3').classList.remove('activeDot');
                    document.getElementById('dot4').classList.remove('activeDot');
                    document.getElementById('dot5').classList.remove('activeDot');
                    break;
                case 'personSlide2':
                    parentElText.innerText = '';
                    parentElName.innerText = '';
                    var text = document.createElement('p');
                    var name = document.createElement('p');
                    text.innerText = Text2;
                    name.innerText = Name2;
                    parentElText.appendChild(text);
                    parentElName.appendChild(name);
                    if(a2) {
                        if (vectorClickW === 'right') {
                            text.classList.add('rightToLeftAnimate');
                            name.classList.add('rightToLeftAnimate');
                        }
                        if (vectorClickW === 'left') {
                            text.classList.add('leftToRightAnimate');
                            name.classList.add('leftToRightAnimate');
                        }
                        a1 = true;
                        a2 = false;
                        a3 = true;
                    }
                    document.getElementById('dot1').classList.remove('activeDot');
                    document.getElementById('dot2').classList.add('activeDot');
                    document.getElementById('dot3').classList.remove('activeDot');
                    document.getElementById('dot4').classList.remove('activeDot');
                    document.getElementById('dot5').classList.remove('activeDot');
                    break;
                case 'personSlide3':
                    parentElText.innerText = '';
                    parentElName.innerText = '';
                    var text = document.createElement('p');
                    var name = document.createElement('p');
                    text.innerText = Text3;
                    name.innerText = Name3;
                    parentElText.appendChild(text);
                    parentElName.appendChild(name);
                    if(a3) {
                        if (vectorClickW === 'right') {
                            text.classList.add('rightToLeftAnimate');
                            name.classList.add('rightToLeftAnimate');
                        }
                        if (vectorClickW === 'left') {
                            text.classList.add('leftToRightAnimate');
                            name.classList.add('leftToRightAnimate');
                        }
                        a2 = true;
                        a3 = false;
                        a4 = true;
                    }
                    document.getElementById('dot1').classList.remove('activeDot');
                    document.getElementById('dot2').classList.remove('activeDot');
                    document.getElementById('dot3').classList.add('activeDot');
                    document.getElementById('dot4').classList.remove('activeDot');
                    document.getElementById('dot5').classList.remove('activeDot');
                    break;
                case 'personSlide4':
                    parentElText.innerText = '';
                    parentElName.innerText = '';
                    var text = document.createElement('p');
                    var name = document.createElement('p');
                    text.innerText = Text4;
                    name.innerText = Name4;
                    parentElText.appendChild(text);
                    parentElName.appendChild(name);
                    if(a4) {
                        if (vectorClickW === 'right') {
                            text.classList.add('rightToLeftAnimate');
                            name.classList.add('rightToLeftAnimate');
                        }
                        if (vectorClickW === 'left') {
                            text.classList.add('leftToRightAnimate');
                            name.classList.add('leftToRightAnimate');
                        }
                        a3 = true;
                        a4 = false;
                        a5 = true;
                    }
                    document.getElementById('dot1').classList.remove('activeDot');
                    document.getElementById('dot2').classList.remove('activeDot');
                    document.getElementById('dot3').classList.remove('activeDot');
                    document.getElementById('dot4').classList.add('activeDot');
                    document.getElementById('dot5').classList.remove('activeDot');
                    break;
                case 'personSlide5':
                    parentElText.innerText = '';
                    parentElName.innerText = '';
                    var text = document.createElement('p');
                    var name = document.createElement('p');
                    text.innerText = Text5;
                    name.innerText = Name5;
                    parentElText.appendChild(text);
                    parentElName.appendChild(name);
                    if(a5) {
                        if (vectorClickW === 'right') {
                            text.classList.add('rightToLeftAnimate');
                            name.classList.add('rightToLeftAnimate');
                        }
                        if (vectorClickW === 'left') {
                            text.classList.add('leftToRightAnimate');
                            name.classList.add('leftToRightAnimate');
                        }
                        a4 = true;
                        a5 = false;
                        a1 = true;
                    }
                    document.getElementById('dot1').classList.remove('activeDot');
                    document.getElementById('dot2').classList.remove('activeDot');
                    document.getElementById('dot3').classList.remove('activeDot');
                    document.getElementById('dot4').classList.remove('activeDot');
                    document.getElementById('dot5').classList.add('activeDot');
                    break;
                default: break;
            }
        }

        if( (element.style.zIndex < 10000) && (element.style.zIndex > 9997) ) {
            element.style.opacity = 0.4;
        }
    })
});

var parentElText = document.getElementById('containerText');
var parentElName = document.getElementById('containerName');

function _activeSlide (id) {
    var element = document.getElementById(id);
    element.style.opacity =  1;
    element.style.display = 'block';
    element.style.position = 'absolute';
    element.style.zIndex = 10000;
    element.style.overflow = 'hidden';
    element.style.width = '150px';
    element.style.height = '150px';
    element.style.left = '60px';
    element.style.top = 0;
}

function _rightSlide (id) {
    var element = document.getElementById(id);
    element.style.display = 'block';
    element.style.opacity =  0.4;
    element.style.position = 'absolute';
    element.style.zIndex = 9999;
    element.style.overflow = 'hidden';
    element.style.width = '105px';
    element.style.height = '105px';
    element.style.left = '165px';
    element.style.top = '22.5px';
}

function _leftSlide (id) {
    var element = document.getElementById(id);
    element.style.display = 'block';
    element.style.opacity =  0.4;
    element.style.position = 'absolute';
    element.style.zIndex = 9999;
    element.style.overflow = 'hidden';
    element.style.width = '105px';
    element.style.height = '105px';
    element.style.left = 0;
    element.style.top = '22.5px';
}

function _hidenSlide (id) {
    var element = document.getElementById(id);
    element.style.display = 'none';
    element.style.position = 'absolute';
    element.style.overflow = 'hidden';
    element.style.width = '105px';
    element.style.height = '105px';
    element.style.left = '82.5px';
    element.style.top = 0;
}