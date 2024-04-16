import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';

type pdfTypes = {
    mainImage: string,
    orderId: string,
    customerName: string,
    items: {
        count: number;
        _id: string;
        watch: {
            _id: string;
            description: string;
            imageURL: string;
            name: string;
            previousPrice: number;
            price: number;
        };
    }[],
    totalAmount: number,
}

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
    },
    identity: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: "flex-start",
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignContent: "flex-start",
    }
});

const PDFFile = ({orderId, customerName, items, totalAmount}: pdfTypes) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text>OnlineStore.co</Text>
            <Text>----------------------------------------------</Text>
            <Text style={styles.identity} fixed>Order N. {orderId} customer: {customerName} </Text>
            { items.map(itm => (
                <View style={styles.item} key={itm._id}>
                    <Text>{itm.watch.name}</Text>
                    <Text>{itm.count}{ itm.count > 1? 'pieces' : 'piece'}</Text>
                    <Text>{itm.count * itm.watch.price}$</Text> 
                </View>
            ))}
            <Text>----------------------------------------------</Text>
            <Text>Total Amount: {totalAmount}$</Text>

            <Text>On behalf of the company</Text>
        </Page>
    </Document>
);

export default PDFFile;
