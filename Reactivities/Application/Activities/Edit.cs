using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity updatedActivity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public IMapper Mapper { get; }

            public Handler(DataContext context, IMapper mapper)
            {
                Mapper = mapper;
                _context = context;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activityToUpdate = _context.Activities.Find(request.updatedActivity.Id);
                Mapper.Map(request.updatedActivity, activityToUpdate);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}