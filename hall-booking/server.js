const express = require('express');
const app = express();
app.use(express.json()); // To parse JSON request bodies

const PORT = process.env.PORT || 3000;

// In-memory storage for rooms and bookings
let rooms = [];
let bookings = [];

// Endpoint 1: Create a Room
app.post('/create-room', (req, res) => {
    const { roomName, numberOfSeats, amenities, pricePerHour } = req.body;

    if (!roomName || !numberOfSeats || !amenities || !pricePerHour) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const roomId = rooms.length + 1;
    const room = { roomId, roomName, numberOfSeats, amenities, pricePerHour };
    rooms.push(room);

    res.status(201).json({ message: 'Room created successfully', room });
});

// Endpoint 2: Book a Room
app.post('/book-room', (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;

    if (!customerName || !date || !startTime || !endTime || !roomId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the room is available for the given time and date
    const room = rooms.find(r => r.roomId === roomId);
    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }

    const roomBooking = bookings.find(b => b.roomId === roomId && b.date === date && 
                                            ((startTime >= b.startTime && startTime < b.endTime) ||
                                             (endTime > b.startTime && endTime <= b.endTime)));

    if (roomBooking) {
        return res.status(400).json({ message: 'Room is already booked during this time' });
    }

    const bookingId = bookings.length + 1;
    const booking = { bookingId, customerName, date, startTime, endTime, roomId };
    bookings.push(booking);

    res.status(201).json({ message: 'Room booked successfully', booking });
});

// Endpoint 3: List All Rooms with Booking Data
app.get('/list-rooms', (req, res) => {
    const roomList = rooms.map(room => {
        const roomBooking = bookings.filter(b => b.roomId === room.roomId);
        return {
            roomName: room.roomName,
            bookedStatus: roomBooking.length > 0 ? 'Booked' : 'Available',
            customerName: roomBooking.length > 0 ? roomBooking[0].customerName : null,
            date: roomBooking.length > 0 ? roomBooking[0].date : null,
            startTime: roomBooking.length > 0 ? roomBooking[0].startTime : null,
            endTime: roomBooking.length > 0 ? roomBooking[0].endTime : null
        };
    });

    res.status(200).json({ rooms: roomList });
});

// Endpoint 4: List All Customers with Booking Data
app.get('/list-customers', (req, res) => {
    const customerList = bookings.map(booking => {
        const room = rooms.find(r => r.roomId === booking.roomId);
        return {
            customerName: booking.customerName,
            roomName: room ? room.roomName : null,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime
        };
    });

    res.status(200).json({ customers: customerList });
});

// Endpoint 5: List How Many Times a Customer Has Booked a Room
app.get('/customer-bookings/:customerName', (req, res) => {
    const customerName = req.params.customerName;

    const customerBookings = bookings.filter(b => b.customerName === customerName);
    if (customerBookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found for this customer' });
    }

    const bookingDetails = customerBookings.map(booking => {
        const room = rooms.find(r => r.roomId === booking.roomId);
        return {
            customerName: booking.customerName,
            roomName: room ? room.roomName : null,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            bookingId: booking.bookingId,
            bookingDate: new Date().toISOString(),
            bookingStatus: 'Confirmed'
        };
    });

    res.status(200).json({ customerBookings: bookingDetails });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
