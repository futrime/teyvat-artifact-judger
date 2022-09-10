/**
 * Update main stat options according to slot
 */
function updateMainStat() {
    const slot = document.querySelector('.taj-slot').value;
    const mainStats = document.querySelectorAll('.taj-main-stat option');
    mainStats.forEach(x => {
        x.setAttribute('hidden', '');
    });
    switch (slot) {
        case '生之花':
            document.querySelector('.taj-main-stat option[value="生命值（数值）"]').removeAttribute('hidden');
            break;
        case '死之羽':
            document.querySelector('.taj-main-stat option[value="攻击力（数值）"]').removeAttribute('hidden');
            break;
        case '时之沙':
            document.querySelector('.taj-main-stat option[value="攻击力"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="生命值"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="防御力"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="元素精通"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="元素充能效率"]').removeAttribute('hidden');
            break;
        case '空之杯':
            document.querySelector('.taj-main-stat option[value="攻击力"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="生命值"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="防御力"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="元素精通"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="物理伤害加成"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="水元素伤害加成"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="火元素伤害加成"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="风元素伤害加成"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="雷元素伤害加成"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="草元素伤害加成"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="冰元素伤害加成"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="岩元素伤害加成"]').removeAttribute('hidden');
            break;
        case '理之冠':
            document.querySelector('.taj-main-stat option[value="攻击力"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="生命值"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="防御力"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="元素精通"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="暴击伤害"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="暴击率"]').removeAttribute('hidden');
            document.querySelector('.taj-main-stat option[value="治疗加成"]').removeAttribute('hidden');
            break;

        default:
            break;
    }
    document.querySelector('.taj-main-stat').value = document.querySelector('.taj-main-stat option:not([hidden])').value;
    updateSubStat();
}

/**
 * Update sub stat options according to main stat
 */
function updateSubStat() {
    document.querySelectorAll('.taj-sub-stat option').forEach(x => {
        x.removeAttribute('hidden');
    });
    const mainStat = document.querySelector('.taj-main-stat').value;
    document.querySelectorAll(`.taj-sub-stat option[value="${mainStat}"]`).forEach(x => {
        x.setAttribute('hidden', '');
    });
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            if (i == j) {
                continue;
            }
            const subStat1 = document.querySelectorAll('.taj-sub-stat')[i];
            const subStatOption = document.querySelectorAll('.taj-sub-stat')[j].querySelector(`option[value="${subStat1.value}"]`);
            if (subStat1.value !== '无' && subStatOption !== null) {
                subStatOption.setAttribute('hidden', '');
            }
        }
    }
}

/**
 * Get the score of an artifact under a rule
 * @param {object} artifact The artifact
 * @param {object} rule The rule
 * @returns {number} The score
 */
function getScore(artifact, rule) {
    let score = 0.0;
    const maxScore = {
        '暴击率': 3.9,
        '暴击伤害': 7.8,
        '攻击力': 5.8,
        '攻击力（数值）': 19,
        '元素精通': 23,
        '元素充能效率': 6.5,
        '防御力': 7.3,
        '防御力（数值）': 23,
        '生命值': 5.8,
        '生命值（数值）': 299
    };
    for (const key in artifact['副属性']) {
        if (key === '无') {
            continue;
        }
        const value = artifact['副属性'][key];
        if (rule['副属性'].indexOf(key) !== -1) {
            score += value / maxScore[key];
        }
    }
    if (artifact['主属性'] !== rule['主属性']) {
        score = 0;
    }
    return score;
}

/**
 * Get the number of valid sub stats
 * @param {object} artifact The artifact
 * @param {object} rule The rule
 * @returns {number} Number of valid sub stats
 */
function getValidSubStatNumber(artifact, rule) {
    let validNumber = 0;
    for (const key in artifact['副属性']) {
        if (key !== '无') {
            const value = artifact['副属性'][key];
            if (rule['副属性'].indexOf(key) !== -1) {
                validNumber++;
            }
        }
    }
    return validNumber;
}

/**
 * Create an element of the scored result
 * @param {object} artifact The artifact
 * @param {object} rule The rule
 * @param {object} templateElement A template element
 * @returns The element created
 */
function createResultElement(artifact, rule, templateElement) {
    const expectedScoreTable = {
        '生命值': (4.1 + 4.7 + 5.3 + 5.8) / 4 / 5.8,
        '生命值（数值）': (209 + 239 + 269 + 299) / 4 / 299,
        '攻击力': (4.1 + 4.7 + 5.3 + 5.8) / 4 / 5.8,
        '攻击力（数值）': (14 + 16 + 18 + 19) / 4 / 19,
        '防御力': (5.1 + 5.8 + 6.6 + 7.3) / 4 / 7.3,
        '防御力（数值）': (16 + 19 + 21 + 23) / 4 / 23,
        '暴击率': (2.7 + 3.1 + 3.5 + 3.9) / 4 / 3.9,
        '暴击伤害': (5.4 + 6.2 + 7.0 + 7.8) / 4 / 7.8,
        '元素精通': (16 + 19 + 21 + 23) / 4 / 23,
        '元素充能效率': (4.5 + 5.2 + 5.8 + 6.5) / 4 / 6.5
    };

    let validStatNumber = 0;
    let expectedScore = 0;
    for (const key in artifact['副属性']) {
        if (rule['副属性'].indexOf(key) !== -1) {
            validStatNumber++;
            expectedScore += expectedScoreTable[key];
        }
    }
    expectedScore = expectedScore / 4;
    expectedScore = rule['纯分数'] + (5 - Math.floor(artifact['等级'] / 4)) * expectedScore;

    const maxValidStatNumber = rule['副属性'].length;
    const maxScore = 5 + maxValidStatNumber;

    const element = templateElement.cloneNode(true);
    element.removeAttribute('hidden');
    element.querySelector('.taj-score').textContent = (rule['评分'] * 100).toFixed(1);
    element.querySelector('.taj-expected-score').textContent = (expectedScore / maxScore * 100).toFixed(1);
    element.querySelector('.taj-characters').textContent = rule['角色'];
    let detail = '';
    if (rule['套装'] === '散件') {
        detail = '作为散件使用';
    } else {
        detail = `作为${rule['套装']}套件使用`;
    }
    element.querySelector('.taj-detail').textContent = detail;
    return element;
}


(async () => { // to use await feature in top level
    // Duplicate sub stat form 4 times
    const subStatFormTemplateNode = document.querySelector('.taj-sub-stat-form');
    for (let i = 0; i < 4; i++) {
        subStatFormTemplate = subStatFormTemplateNode.cloneNode(true);
        subStatFormTemplate.removeAttribute('hidden');
        subStatFormTemplateNode.parentElement.insertBefore(subStatFormTemplate.cloneNode(true), subStatFormTemplateNode);
    }
    subStatFormTemplateNode.remove();

    // Initialize main stat form and sub stat forms
    updateMainStat();
    updateSubStat();

    const data = await fetch('data.json').then(res => res.json()); // fetch rule data

    for (const artifactSet in data) {
        if (artifactSet !== '散件') {
            const artifactSetOptionElement = document.createElement('option');
            artifactSetOptionElement.setAttribute('value', artifactSet);
            artifactSetOptionElement.textContent = artifactSet;
            document.querySelector('.taj-set').append(artifactSetOptionElement);
        }
    }

    // Add event listeners
    document.querySelector('.taj-slot').addEventListener('input', updateMainStat);
    document.querySelector('.taj-main-stat').addEventListener('input', updateSubStat);
    document.querySelectorAll('.taj-sub-stat').forEach(x => {
        x.addEventListener('input', updateSubStat);
    });
    document.querySelector('.taj-submit').addEventListener('click', () => {
        // Constuct an artifact object
        const artifact = {
            '套装': document.querySelector('.taj-set').value,
            '佩戴部位': document.querySelector('.taj-slot').value,
            '等级': Number(document.querySelector('.taj-level').value),
            '主属性': document.querySelector('.taj-main-stat').value,
            '副属性': {
            }
        };
        for (let i = 0; i < 4; ++i) {
            artifact['副属性'][document.querySelectorAll('.taj-sub-stat')[i].value] = Number(document.querySelectorAll('.taj-sub-stat-value')[i].value);
        }

        // Check if all values are valid
        document.querySelectorAll('.taj-form .is-invalid').forEach(x => x.classList.remove('is-invalid'));
        let isAllValid = true;
        if (artifact['等级'] < 0 || artifact['等级'] > 20) {
            document.querySelector('.taj-level').classList.add('is-invalid');
            isAllValid = false;
        }
        const maxScoreTable = {
            '暴击率': 3.9,
            '暴击伤害': 7.8,
            '攻击力': 5.8,
            '攻击力（数值）': 19,
            '元素精通': 23,
            '元素充能效率': 6.5,
            '防御力': 7.3,
            '防御力（数值）': 23,
            '生命值': 5.8,
            '生命值（数值）': 299
        };
        for (let key in artifact['副属性']) {
            if (key === '无') {
                continue;
            }
            if (artifact['副属性'][key] < 0 || artifact['副属性'][key] > maxScoreTable[key] * (Math.floor(Math.max(0, artifact['等级']) / 4) + 1)) {
                document.querySelectorAll('.taj-sub-stat').forEach(x => {
                    if (x.value === key) {
                        x.parentElement.querySelector('input').classList.add('is-invalid');
                    }
                });
                isAllValid = false;
            }
        }
        if (isAllValid === false) {
            return;
        }


        // Get the scores under different rules
        const rules = [];
        for (const set in data) {
            if (set === artifact['套装'] || set === '散件') {
                for (const rule of data[set]) {
                    if (rule['佩戴部位'] === artifact['佩戴部位'] && rule['主属性'] === artifact['主属性']) {
                        const maxValidStatNumber = rule['副属性'].length;
                        const maxScore = Math.floor(artifact['等级'] / 4) + maxValidStatNumber;
                        rule['纯分数'] = getScore(artifact, rule);
                        rule['评分'] = rule['纯分数'] / maxScore;
                        rule['套装'] = set;
                        rules.push(rule);
                    }
                }
            }
        }
        rules.sort((a, b) => (b['评分'] - a['评分']));

        document.querySelectorAll('.taj-info > .taj-result:not([hidden])').forEach(x => {
            x.remove();
        }); // remove previous results
        const templateElement = document.querySelector('.taj-result');
        for (let i = 0; i < rules.length; ++i) {
            document.querySelector('.taj-info').append(createResultElement(artifact, rules[i], templateElement));
        }
    });
})();

