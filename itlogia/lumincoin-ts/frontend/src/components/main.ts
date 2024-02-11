import {Chart, registerables} from '../libraries/chart.js';
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {FilterType} from "../types/filter.type";
import {EnumHelper} from "../services/enum-helper";
import {OperationType} from "../types/operation.type";
import {DefaultResponseType} from "../types/default-response.type";

export class Main {
    readonly date1: HTMLInputElement | null = null;
    readonly date2: HTMLInputElement | null = null;
    private data1: any = {};
    private data2: any = {};
    readonly chart1: Chart | null = null;
    readonly chart2: Chart | null = null;
    private operations: OperationType[] | null = null;

    config1 = {
        type: 'pie',
        data: this.data1,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 12,
                            family: "Roboto, sans-serif",
                            weight: "bold",
                        }
                    },

                },
                title: {
                    display: true,
                    text: 'Доходы',
                    font: {
                        size: 28,
                        family: "Roboto, sans-serif",
                        weight: "bold",
                    }
                }
            }
        },
    };

    config2 = {
        type: 'pie',
        data: this.data2,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 12,
                            family: "Roboto, sans-serif",
                            weight: "bold",
                        }
                    },

                },
                title: {
                    display: true,
                    text: 'Расходы',
                    font: {
                        size: 28,
                        family: "Roboto, sans-serif",
                        weight: "bold",
                    }
                }
            }
        },
    };

    constructor() {
        const that: Main = this;
        this.date1 = document.getElementById('date1') as HTMLInputElement;
        this.date2 = document.getElementById('date2') as HTMLInputElement;

        Array.from(document.getElementsByClassName('main-period')).forEach(function (item) {
            (item as HTMLElement).onclick = function () {
                const intervalElement = document.getElementById('interval') as HTMLInputElement;
                if (intervalElement && that.date1 && that.date2) {
                    if (intervalElement.checked) {
                        that.date1.disabled = false;
                        that.date2.disabled = false;
                    } else {
                        that.date1.disabled = true;
                        that.date2.disabled = true;
                    }
                    that.showChartsWithFilter(EnumHelper.stringToEnum(item.id, FilterType));  //was this.id
                }
            }
        })

        this.date1.oninput = function () {
            that.showChartsWithFilter(FilterType.interval);
        }
        this.date2.oninput = function () {
            that.showChartsWithFilter(FilterType.interval);
        }

        Chart.register(...registerables);
        this.chart1 = new Chart(document.getElementById('revenues'), this.config1);
        this.chart2 = new Chart(document.getElementById('expenses'), this.config2);

        this.showChartsWithFilter(FilterType.today);
    }

    private async showChartsWithFilter(params: FilterType | undefined): Promise<void> {
        if (!params || !this.date1 || !this.date2) return;

        try {
            let paramsString: string = '';

            if (params === FilterType.interval && this.date1.value && this.date2.value) {
                paramsString = '?period=interval&dateFrom=' + this.date1.value + '&dateTo=' + this.date2.value;
            }
            if (params !== FilterType.interval) {
                paramsString = '?period=' + params.toString();
            }
            const result: OperationType[] | DefaultResponseType = await CustomHttp.request(config.host + '/operations' + paramsString);
            if (result) {
                if ((result as DefaultResponseType).error) {
                    throw new Error((result as DefaultResponseType).message);
                }

                this.operations = result as OperationType[];
                await this.showCharts();
            }
        } catch (error) {
            console.log(error);
        }
    }

    private async showCharts(): Promise<void> {
        if (!this.operations || !this.chart1 || !this.chart2) {
            return;
        }

        let calcRevenueOperations: { [category: string]: number } = {};
        let calcExpensesOperations: { [category: string]: number } = {};
        this.operations.forEach((operation: OperationType) => {
            if (operation.type === 'income') {
                if (calcRevenueOperations[operation.category] === undefined) {
                    calcRevenueOperations[operation.category] = operation.amount;
                } else {
                    calcRevenueOperations[operation.category] = calcRevenueOperations[operation.category] + operation.amount;
                }
            } else {
                if (calcExpensesOperations[operation.category] === undefined) {
                    calcExpensesOperations[operation.category] = operation.amount;
                } else {
                    calcExpensesOperations[operation.category] = calcExpensesOperations[operation.category] + operation.amount;
                }
            }
        })
        this.data1['labels'] = Object.keys(calcRevenueOperations);
        this.data1['datasets'] = [{
            label: 'Доходы',
            data: Object.values(calcRevenueOperations)
        }]

        this.data2['labels'] = Object.keys(calcExpensesOperations);
        this.data2['datasets'] = [{
            label: 'Расходы',
            data: Object.values(calcExpensesOperations)
        }]

        this.chart1.update();
        this.chart2.update();
    }
}
