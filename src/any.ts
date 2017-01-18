import _ from "./_";
import genIterator from "./genIterator";

export default (iterable: Iterable<any>) => {
    var iter = genIterator(iterable);

    return new _.Promise((resolve, reject) => {
        var countDown = 0;
        var reasons = [];
        var item;

        function onError (reason) {
            reasons.push(reason);
            if (!--countDown)
                reject(reasons);
        }

        while (!(item = iter.next()).done) {
            countDown++;
            _.Promise.resolve(item.value).then(resolve, onError);
        }
    });
};