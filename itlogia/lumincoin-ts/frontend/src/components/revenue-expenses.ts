import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {SessionParams} from "../services/session-params";
import {CustomDate} from "../services/custom-date";
import {OperationType} from "../types/operation.type";
import {EnumHelper} from "../services/enum-helper";
import {FilterType} from "../types/filter.type";
import {DefaultResponseType} from "../types/default-response.type";

export class RevenueExpenses {
    private operations: OperationType[] | null = null;
    readonly date1: HTMLInputElement | null = null;
    readonly date2: HTMLInputElement | null = null;
    private currentOperation: string | null = null;

    constructor() {
        const that = this;
        this.date1 = document.getElementById('date1') as HTMLInputElement;
        this.date2 = document.getElementById('date2') as HTMLInputElement;

        Array.from(document.getElementsByClassName('revenue-expenses-period')).forEach(function (item) {
            (item as HTMLElement).onclick = function () {
                const intervalElement: HTMLInputElement = document.getElementById('interval') as HTMLInputElement;
                if (intervalElement && that.date1 && that.date2) {
                    if (intervalElement.checked) {
                        that.date1.disabled = false;
                        that.date2.disabled = false;
                    } else {
                        that.date1.disabled = true;
                        that.date2.disabled = true;
                    }
                    that.showOperationsWithFilter(EnumHelper.stringToEnum(item.id, FilterType)); //was this.id
                }
            }
        })

        this.date1.oninput = function () {
            that.showOperationsWithFilter(FilterType.interval);
        }
        this.date2.oninput = function () {
            that.showOperationsWithFilter(FilterType.interval);
        }

        const deleteCategoryElement = document.getElementById('delete-operation');
        if (deleteCategoryElement) {
            deleteCategoryElement.onclick = function () {
                that.deleteOperation();
            }
        }
        this.init();
    }

    private async init(): Promise<void> {
        try {
            const result: OperationType[] | DefaultResponseType = await CustomHttp.request(config.host + '/operations');
            if (result) {
                if ((result as DefaultResponseType).error) {
                    throw new Error((result as DefaultResponseType).message);
                }

                this.operations = result as OperationType[];
                this.showOperations();

            }
        } catch (error) {
            console.log(error);
        }
    }

    private showOperations(): void {
        let i: number = 1;

        if (!this.operations) return;

        const operationsElement: HTMLElement | null = document.getElementById('operations');
        if (operationsElement) {
            operationsElement.replaceChildren();
        }

        this.operations.forEach((operation: OperationType) => {
                const operationElement = document.createElement('tr');
                operationElement.setAttribute('operation-id', operation.id.toString());

                const operationHeadElement = document.createElement('th');
                operationHeadElement.setAttribute('scope', 'row');
                operationHeadElement.innerText = i.toString();
                i++;

                const operationTypeElement = document.createElement('td');
                if (operation.type === 'expense') {
                    operationTypeElement.innerText = 'расход';
                    operationTypeElement.className = 'text-danger';
                } else {
                    operationTypeElement.innerText = 'доход';
                    operationTypeElement.className = 'text-success';
                }

                const operationCategoryElement: HTMLTableCellElement = document.createElement('td');
                operationCategoryElement.innerText = operation.category;

                const operationAmountElement: HTMLTableCellElement = document.createElement('td');
                operationAmountElement.innerText = operation.amount + '$';

                const operationDateElement: HTMLTableCellElement = document.createElement('td');
                operationDateElement.innerText = CustomDate.toCustomDateFormat(operation.date);

                const operationCommentElement: HTMLTableCellElement = document.createElement('td');
                operationCommentElement.innerText = operation.comment;

                const operationActionsElement: HTMLTableCellElement = document.createElement('td');
                operationActionsElement.innerHTML = "<td>\n" +
                    "                        <div class=\"table-actions\">\n" +
                    "                            <a href=\"javascript:void(0)\" class=\"action-delete\" data-bs-toggle=\"modal\" data-bs-target=\"#deleteModal\">\n" +
                    "                                <svg width=\"14\" height=\"15\" viewBox=\"0 0 14 15\" fill=\"none\"\n" +
                    "                                     xmlns=\"http://www.w3.org/2000/svg\">\n" +
                    "                                    <path d=\"M4.5 5.5C4.77614 5.5 5 5.72386 5 6V12C5 12.2761 4.77614 12.5 4.5 12.5C4.22386 12.5 4 12.2761 4 12V6C4 5.72386 4.22386 5.5 4.5 5.5Z\"\n" +
                    "                                          fill=\"black\"/>\n" +
                    "                                    <path d=\"M7 5.5C7.27614 5.5 7.5 5.72386 7.5 6V12C7.5 12.2761 7.27614 12.5 7 12.5C6.72386 12.5 6.5 12.2761 6.5 12V6C6.5 5.72386 6.72386 5.5 7 5.5Z\"\n" +
                    "                                          fill=\"black\"/>\n" +
                    "                                    <path d=\"M10 6C10 5.72386 9.77614 5.5 9.5 5.5C9.22386 5.5 9 5.72386 9 6V12C9 12.2761 9.22386 12.5 9.5 12.5C9.77614 12.5 10 12.2761 10 12V6Z\"\n" +
                    "                                          fill=\"black\"/>\n" +
                    "                                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n" +
                    "                                          d=\"M13.5 3C13.5 3.55228 13.0523 4 12.5 4H12V13C12 14.1046 11.1046 15 10 15H4C2.89543 15 2 14.1046 2 13V4H1.5C0.947715 4 0.5 3.55228 0.5 3V2C0.5 1.44772 0.947715 1 1.5 1H5C5 0.447715 5.44772 0 6 0H8C8.55229 0 9 0.447715 9 1H12.5C13.0523 1 13.5 1.44772 13.5 2V3ZM3.11803 4L3 4.05902V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V4.05902L10.882 4H3.11803ZM1.5 3V2H12.5V3H1.5Z\"\n" +
                    "                                          fill=\"black\"/>\n" +
                    "                                </svg>\n" +
                    "                            </a>\n" +
                    "                            <a href=\"#/revenue-expenses-edit\" class=\"action-edit\">\n" +
                    "                                <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\"\n" +
                    "                                     xmlns=\"http://www.w3.org/2000/svg\">\n" +
                    "                                    <path d=\"M12.1465 0.146447C12.3417 -0.0488155 12.6583 -0.0488155 12.8536 0.146447L15.8536 3.14645C16.0488 3.34171 16.0488 3.65829 15.8536 3.85355L5.85357 13.8536C5.80569 13.9014 5.74858 13.9391 5.68571 13.9642L0.68571 15.9642C0.500001 16.0385 0.287892 15.995 0.146461 15.8536C0.00502989 15.7121 -0.0385071 15.5 0.0357762 15.3143L2.03578 10.3143C2.06092 10.2514 2.09858 10.1943 2.14646 10.1464L12.1465 0.146447ZM11.2071 2.5L13.5 4.79289L14.7929 3.5L12.5 1.20711L11.2071 2.5ZM12.7929 5.5L10.5 3.20711L4.00001 9.70711V10H4.50001C4.77616 10 5.00001 10.2239 5.00001 10.5V11H5.50001C5.77616 11 6.00001 11.2239 6.00001 11.5V12H6.29291L12.7929 5.5ZM3.03167 10.6755L2.92614 10.781L1.39754 14.6025L5.21903 13.0739L5.32456 12.9683C5.13496 12.8973 5.00001 12.7144 5.00001 12.5V12H4.50001C4.22387 12 4.00001 11.7761 4.00001 11.5V11H3.50001C3.28561 11 3.10272 10.865 3.03167 10.6755Z\"\n" +
                    "                                          fill=\"black\"/>\n" +
                    "                                </svg>\n" +
                    "                            </a>\n" +
                    "                        </div>\n" +
                    "                    </td>";

                operationElement.appendChild(operationHeadElement);
                operationElement.appendChild(operationTypeElement);
                operationElement.appendChild(operationCategoryElement);
                operationElement.appendChild(operationAmountElement);
                operationElement.appendChild(operationDateElement);
                operationElement.appendChild(operationCommentElement);
                operationElement.appendChild(operationActionsElement);

                const operationsElement: HTMLElement | null = document.getElementById('operations');
                if (operationsElement) {
                    operationsElement.appendChild(operationElement);
                }
            }
        )

        let that: RevenueExpenses = this;
        if (this.operations.length > 0) {
            Array.from(document.getElementsByClassName("action-delete")).forEach(deleteElement => {
                (deleteElement as HTMLElement).onclick = function () {
                    const parentElement: HTMLElement | null | undefined = (this as HTMLElement).parentElement?.parentElement?.parentElement;
                    if (parentElement) {
                        that.currentOperation = parentElement.getAttribute('operation-id');
                    }
                }
            });
            Array.from(document.getElementsByClassName("action-edit")).forEach(editElement => {
                (editElement as HTMLElement).onclick = function () {
                    const parentElement: HTMLElement | null | undefined = (this as HTMLElement).parentElement?.parentElement?.parentElement;
                    if (parentElement) {
                        that.currentOperation = parentElement.getAttribute('operation-id');
                        if (that.currentOperation) {
                            SessionParams.setOperationId(that.currentOperation);
                        }
                    }
                }
            });
        }
    }

    private async showOperationsWithFilter(params: FilterType | undefined): Promise<void> {
        if (!params || !this.date1 || !this.date2) {
            return;
        }
        try {
            let paramsString: string = '';

            if (params === FilterType.interval && this.date1.value && this.date2.value) {
                paramsString = '?period=interval&dateFrom=' + this.date1.value + '&dateTo=' + this.date2.value;
            }
            if (params != FilterType.interval) {
                paramsString = '?period=' + params.toString();
            }
            const result: OperationType[] | DefaultResponseType = await CustomHttp.request(config.host + '/operations' + paramsString);
            if (result) {
                if ((result as DefaultResponseType).error) {
                    throw new Error((result as DefaultResponseType).message);
                }

                this.operations = result as OperationType[];
                this.showOperations();
            }
        } catch (error) {
            console.log(error);
        }
    }

    private async deleteOperation(): Promise<void> {
        if (this.currentOperation) {
            try {
                const result: DefaultResponseType = await CustomHttp.request(config.host + '/operations/' + this.currentOperation, 'DELETE');

                if (result) {
                    if ((result as DefaultResponseType).error) {
                        throw new Error((result as DefaultResponseType).message);
                    }
                    location.reload();
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            return;
        }
    }
}