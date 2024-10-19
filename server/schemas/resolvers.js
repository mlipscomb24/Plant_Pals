

const resolvers = {
    Query: {
    users: async () => {
            return User.find();
        }, 
    user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },

    me: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id }); 
        }
        throw new AuthenticationError('You need to be logged in to view your profile.');
        },
    user: async (parent, args, context) => {
        if (context.user) {
            const user = await user.findById(context.user._id).populate({
                path: 'plants',
                populate: { path: 'user' }
            });
            return user;
      }
     throw new AuthenticationError('You need to be logged in to view this profile.');
    }, 


//mutation that conforms to activities
     Mutatation: {
        // add validation
        addUser: async (parent, { email, password }) => {
            const user = await User.create(args);
            const token = signToken(user);
            
            return { token, user };
        },
        
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true});
            }
            throw AuthenticationError; 
         },
        
         addPlant: async (parent, { userId, plantData }) => {
            const user = await User.findByIdAndUpdate(userId, { $push: { plants: plantData } }, { new: true });
            
            return user;
        }

     },

     //replace email with username 
     login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        
        if (!user) throw new Error('No user found with that email.');
        
        const valid = await user.comparePassword(password);
        
        if (!valid) throw new Error('Incorrect password.');
        
        const token = signToken(user);
        
        return { token, user };
     },
   
     addPlant: async (parent, args, context) => {
        if (context.user) {
            return await User.findByIdAndUpdate(context.user._id, { $push: { plants: args.plantId } }, { new: true });
        }
        throw AuthenticationError;
     },
     removePlant: async (parent, args, context) => {
        if (context.user) {
            return await User.findByIdAndUpdate(context.user._id, { $pull: { plants: args.plantId } }, { new: true });
        }
        throw AuthenticationError;
     },

     //commented out mutation
/* 
     Mutation: {
        createProfile: async (parent, { input }) => {
            const profile = new Profile({...input });
            await profile.save();
            return profile;
        },
        updateProfile: async (parent, { profileId, input }) => {
            return await Profile.findOne(profileId, input, { new: true });
        },
        deleteProfile: async (parent, { profileId }) => {
            return await Profile.findOne(profileId);
        },
        addPlant: async (parent, { profileId, plantId }) => {
            const profile = await Profile.findOne(profileId, { $push: { plants: plantId } }, { new: true });
            return profile;
        },
        removePlant: async (parent, { profileId, plantId }) => {
            const profile = await Profile.findOne(profileId, { $pull: { plants: plantId } }, { new: true });
            return
    } */
    } 
}; 

    module.exports = resolvers;